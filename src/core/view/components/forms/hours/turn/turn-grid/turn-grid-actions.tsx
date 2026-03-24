import type { TurnDay } from "@/domain/entities/turns/turn-day";
import { type TurnFormProps, TurnTypeEnum } from "@/domain/entities/turns/turns";
import type { CellChange, CellLocation, DefaultCellTypes } from "@silevis/reactgrid";
import { differenceInMinutes, isBefore, parse } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { HourCell } from "../../../../react-grid/cells/hour-cells";

type Days = TurnDay[];
type SetDays = React.Dispatch<React.SetStateAction<TurnDay[]>>;
interface States {
	days: Days;
	setDays: SetDays;
}
export interface TurnGridActionsHandleDsrParams extends States {
	index: number;
	periods: number;
	form: UseFormReturn<TurnFormProps>;
}
export interface TurnGridActionsUpdateEntriesParams {
	days: TurnDay[];
	form: UseFormReturn<TurnFormProps>;
}
export interface TurnGridActionsOnCellsChangedParams extends States {
	changes: CellChange<DefaultCellTypes | HourCell>[];
	periods: number;
	form: UseFormReturn<TurnFormProps>;
}
export interface TurnGridActionsCalculateTotalRowParams {
	day: TurnDay;
	periods: number;
}
export interface TurnGridActionsHandleClearLineParams extends States {
	index: number;
}
export interface TurnGridActionsCalculateTotalsParams {
	days: Days;
}
export interface TurnGridActionsWeekLabelsUseCaseParams {
	index: number;
	type: "" | TurnTypeEnum;
}
export interface TurnGridActionsOnFocusChangeParams {
	nextLocation: CellLocation;
	currentCellLocation: CellLocation | undefined;
	setCurrentCellLocation: Dispatch<SetStateAction<CellLocation | undefined>>;
	cycleDays: number;
}
export interface ResetFocusParams {
	setCurrentCellLocation: Dispatch<SetStateAction<CellLocation | undefined>>;
}
function handleDSR({ index, days, setDays, periods, form }: TurnGridActionsHandleDsrParams) {
	handleClearLine({ index, days, setDays });
	const newDays = [...days];
	const currentDay = newDays[index];
	currentDay.isOff = !currentDay.isOff;
	if (currentDay.isOff) {
		currentDay.total = "-";
		currentDay.dayCutover = "-";
	}
	if (!currentDay.isOff) {
		currentDay.total = "00:00";
		currentDay.dayCutover = "00:00";
	}
	Array.from({ length: periods }).forEach((_, idx) => {
		currentDay.periods[idx].startTime = "";
		currentDay.periods[idx].endTime = "";
	});
	setDays(newDays);
	updateEntries({ days, form });
}
function splitTextAndNumber(value: string) {
	const match = value.match(/^([a-zA-Z]+)(\d+)$/);
	if (!match) {
		return null;
	}
	return {
		key: match[1] as "startTime" | "endTime",
		index: Number(match[2]),
	};
}
function updateEntries({ days, form }: TurnGridActionsUpdateEntriesParams) {
	form.setValue("days", days);
}
function onCellsChanged({
	changes,
	days,
	setDays,
	periods,
	form,
}: TurnGridActionsOnCellsChangedParams) {
	const updatedDays = [...days];
	for (const { rowId, type, columnId, newCell } of changes) {
		const index = Number(rowId);
		const currentDay = updatedDays[index];
		if (!currentDay) return;
		if (type === "hour" && columnId === "dayCutover") {
			currentDay.dayCutover = newCell.text;
			continue;
		}
		const columnFormated = splitTextAndNumber(columnId as string);
		if (type === "hour" && columnFormated != null) {
			const currentPeriod = currentDay.periods[columnFormated.index - 1];
			currentPeriod[columnFormated.key] = newCell.text;
		}
		currentDay.total = calculateTotalRow({ day: currentDay, periods });
	}
	setDays(updatedDays);
	updateEntries({ days: updatedDays, form });
}
function calculateTotalRow({ day, periods }: TurnGridActionsCalculateTotalRowParams): string {
	let totalMinutes = 0;
	for (let i = 0; i <= periods; i++) {
		const entryTime = day.periods[i]?.startTime ?? "";
		const outTime = day.periods[i]?.endTime ?? "";
		if (entryTime && outTime) {
			const entryDate = parse(entryTime, "HH:mm", new Date());
			const outDate = parse(outTime, "HH:mm", new Date());
			if (!isBefore(entryDate, outDate)) return "00:00";
			totalMinutes += differenceInMinutes(outDate, entryDate);
		}
	}
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	if (Number.isNaN(hours) || Number.isNaN(minutes)) return "";
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
function handleClearLine({ index, days, setDays }: TurnGridActionsHandleClearLineParams) {
	const arrDays = [...days];
	const daysToClear = arrDays[index];
	arrDays[index] = {
		...daysToClear,
		periods: daysToClear.periods.map((period) => ({
			...period,
			startTime: "",
			endTime: "",
		})),
		total: "00:00",
	};
	setDays(arrDays);
}
function calculateTotals({ days }: TurnGridActionsCalculateTotalsParams) {
	let totals = 0;

	for (const day of days) {
		if (!day) continue;
		const { isOff, total } = day;
		if (isOff || !total) continue;
		const date = parse(total, "HH:mm", new Date());
		totals = totals + (date.getHours() * 60 + date.getMinutes());
	}
	const hours = Math.floor(totals / 60);
	const minutes = totals % 60;
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
function weekLabelsUseCase({ index, type }: TurnGridActionsWeekLabelsUseCaseParams) {
	const weekLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
	return type === TurnTypeEnum.weekly ? weekLabels[index] : (index + 1).toString().padStart(2, "0");
}
function onFocusChanging({
	currentCellLocation,
	cycleDays,
	nextLocation,
	setCurrentCellLocation,
}: TurnGridActionsOnFocusChangeParams): boolean {
	const nextColId = String(nextLocation.columnId);
	const nextRowId = Number(nextLocation.rowId === "header" ? 0 : nextLocation.rowId);
	if (nextLocation.rowId === "header") return false;
	if (nextColId === "actions") return false;
	if (nextColId === "dsr") return false;
	if (nextColId === "dayCutover" && nextRowId) {
		setCurrentCellLocation({
			columnId: "dayCutover",
			rowId: nextRowId,
		});
		return true;
	}
	const match = nextColId.match(/(startTime|endTime)(\d+)|total/);
	if (!match) {
		resetFocus({ setCurrentCellLocation });
		return true;
	}
	const isRowIdGreaterThenCycleDays = nextRowId + 1 === cycleDays;
	if (match[0] === "total" && !isRowIdGreaterThenCycleDays) {
		setCurrentCellLocation({
			columnId: "startTime1",
			rowId: nextRowId + 1,
		});
		return true;
	}
	if (match[0] === "total" && isRowIdGreaterThenCycleDays) {
		setCurrentCellLocation({
			columnId: "startTime1",
			rowId: 0,
		});
		return true;
	}
	if (currentCellLocation === undefined) {
		setCurrentCellLocation(nextLocation);
		return true;
	}
	setCurrentCellLocation(nextLocation);
	return true;
}
function resetFocus({ setCurrentCellLocation }: ResetFocusParams) {
	setCurrentCellLocation(undefined);
}
export const turnGridActions = {
	handleDSR,
	updateEntries,
	onCellsChanged,
	calculateTotalRow,
	handleClearLine,
	calculateTotals,
	weekLabelsUseCase,
	onFocusChanging,
	resetFocus,
};
