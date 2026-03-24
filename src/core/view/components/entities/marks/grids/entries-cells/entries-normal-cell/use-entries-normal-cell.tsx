import { dailySlotFacadeFactory } from "@/application/factories/daily-slot";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import type {
	EntryAndOutKey,
	MarkEntriesAndOutsDetails,
	MarkStatusEnum,
} from "@/domain/entities/marks/marks";
import {
	nextSlotKind,
	parseEntryKeyToSlotKindAndIndex,
} from "@/domain/entities/marks/parse-entry-key-to-slot-kind-and-index";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import {
	MarkSheetForm,
	MarkSheetFormHeader,
} from "@/view/components/forms/mark/mark/mark-sheet-form";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { addDays, format, parse, subDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { TimetrackingMoveEntryToast } from "../../../../../../pages/timetracking/components/toasts/move-entry";

interface useMarkEntriesNormalCell {
	details: MarkEntriesAndOutsDetails;
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
	date: Date;
	idMark?: string;
	status: MarkStatusEnum;
	refetchGridValues: () => void;
}
export function useMarkEntriesNormalCell({
	collaborator,
	details: { justify, value },
	entryKey,
	date,
	status,
	idMark,
	refetchGridValues,
}: useMarkEntriesNormalCell) {
	const { setContentAndOpen } = useContextSheetContentController();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const dailySlotFacade = useMemo(() => dailySlotFacadeFactory(token), [token]);

	const defaultValues: MarkFormProps = {
		hour: value ?? "",
		justify: justify ?? "",
		date,
		collaborator,
		entryKey,
	};

	const [open, setOpen] = useState<boolean>(false);
	const [canCloseOnBlur, setCanCloseOnBlur] = useState<boolean>(true);
	function getTimestempDate() {
		return format(date, "yyyy-MM-dd");
	}
	function getNewDateForSlot(type: "PREVIOUS" | "NEXT") {
		const currentDate = parse(getTimestempDate(), "yyyy-MM-dd", new Date());
		const date = new Date(currentDate);
		const moveToDate = type === "NEXT" ? addDays(date, 1) : subDays(date, 1);
		return format(moveToDate, "yyyy-MM-dd");
	}
	async function moveEntryPreviousDay() {
		if (!idMark) return;
		try {
			const { index, kind } = parseEntryKeyToSlotKindAndIndex(entryKey);
			await dailySlotFacade.moveToDate({
				slotId: idMark,
				body: {
					reason: `Marcação original do dia ${getTimestempDate()}`,
					targetDate: getNewDateForSlot("PREVIOUS"),
					targetIndex: index,
					targetKind: kind,
				},
			});
			refetchGridValues();
			toastController.custom({
				Component: (
					<TimetrackingMoveEntryToast
						type="previousDay"
						hour="value"
						name={collaborator.name}
						entryKey={entryKey}
					/>
				),
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
		} catch (error) {
			console.log({ error });
			toastError({ tittle: "Error" });
		}
	}
	async function moveEntryNextDay() {
		if (!idMark) return;
		try {
			const { index, kind } = parseEntryKeyToSlotKindAndIndex(entryKey);
			await dailySlotFacade.moveToDate({
				slotId: idMark,
				body: {
					reason: `Marcação original do dia ${getTimestempDate()}`,
					targetDate: getNewDateForSlot("NEXT"),
					targetIndex: index,
					targetKind: kind,
				},
			});
			refetchGridValues();
			toastController.custom({
				Component: (
					<TimetrackingMoveEntryToast
						type="nextDay"
						hour="value"
						name={collaborator.name}
						entryKey={entryKey}
					/>
				),
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
		} catch (error) {
			console.log({ error });
			toastError({ tittle: "Error" });
		}
	}

	function nextSlot(direction: "RIGHT" | "LEFT") {
		const slot = parseEntryKeyToSlotKindAndIndex(entryKey);
		// const kinds: Record<DailySlotKind, DailySlotKind> = {
		// 	ENTRY: "OUT",
		// 	OUT: "ENTRY",
		// };
		const slotKindTo = nextSlotKind(slot.kind);
		const operationCase = direction === "RIGHT" ? slot.index + 1 : slot.index - 1;
		if (direction === "RIGHT")
			return {
				kind: slotKindTo,
				index: slotKindTo === "ENTRY" ? operationCase : slot.index,
			};
		return {
			kind: slotKindTo,
			index: slotKindTo === "OUT" ? operationCase : slot.index,
		};
	}
	async function moveEntryRight() {
		if (!idMark) return;
		try {
			const slot = parseEntryKeyToSlotKindAndIndex(entryKey);
			await dailySlotFacade.shift({
				date: getTimestempDate(),
				slotId: idMark,
				body: {
					ops: [
						{
							type: "move",
							from: slot,
							to: nextSlot("RIGHT"),
						},
					],
				},
			});
			refetchGridValues();
			toastController.custom({
				Component: (
					<TimetrackingMoveEntryToast
						type="right"
						hour="value"
						name={collaborator.name}
						entryKey={entryKey}
					/>
				),
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
		} catch {
			toastError({ tittle: "Error" });
		}
	}
	async function moveEntryLeft() {
		if (!idMark) return;
		try {
			const slot = parseEntryKeyToSlotKindAndIndex(entryKey);
			await dailySlotFacade.shift({
				date: getTimestempDate(),
				slotId: idMark,
				body: {
					ops: [
						{
							type: "move",
							from: slot,
							to: nextSlot("LEFT"),
						},
					],
				},
			});
			refetchGridValues();
			toastController.custom({
				Component: (
					<TimetrackingMoveEntryToast
						type="left"
						hour="value"
						name={collaborator.name}
						entryKey={entryKey}
					/>
				),
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
		} catch {
			toastError({ tittle: "Error" });
		}
	}
	function openSheetDisconsiderMark() {
		setContentAndOpen({
			sheetMinWidth: "410px",
			Header: <MarkSheetFormHeader type="disconsider" />,
			Body: (
				<MarkSheetForm
					values={defaultValues}
					collaborator={collaborator}
					type="disconsider"
					idMark={idMark}
					status={status}
					refetchGridValues={refetchGridValues}
				/>
			),
		});
		setOpen(false);
	}

	return {
		open,
		setOpen,
		canCloseOnBlur,
		setCanCloseOnBlur,
		moveEntryPreviousDay,
		moveEntryNextDay,
		moveEntryRight,
		moveEntryLeft,
		openSheetDisconsiderMark,
	};
}
