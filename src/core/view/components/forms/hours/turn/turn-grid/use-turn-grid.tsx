import type { TurnDay } from "@/domain/entities/turns/turn-day";
import {
	type TurnEntriesAndOuts,
	type TurnFormProps,
	TurnTypeEnum,
} from "@/domain/entities/turns/turns";
import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";
import type { HourCell } from "@/view/components/react-grid/cells/hour-cells";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Switch } from "@/view/components/ui/switch";
import type { CellLocation, CellStyle, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { Eraser } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { turnGridActions } from "./turn-grid-actions";

interface UseTurnGridParams {
	form: UseFormReturn<TurnFormProps>;
}

export interface TurnDetails extends TurnEntriesAndOuts {
	week: string;
}

export function useTurnGrid({ form }: UseTurnGridParams) {
	const cycleLengthDays = Number(form.watch("cycleLengthDays"));
	const periods = Number(form.getValues("periods"));
	const patternType = form.getValues("patternType");

	// ⚠️ NÃO use watch para objetos complexos em dependências de useEffect
	// Use refs para acessar valores atuais quando necessário
	const formDaysRef = useRef(form.getValues("days") ?? []);

	useEffect(() => {
		formDaysRef.current = form.getValues("days") ?? [];
	}, [form]);

	const paddingLeft: CellStyle = useMemo(() => ({ paddingLeft: "8px" }), []);
	const wrapperFormRef = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState<number>(0);
	const [currentCellLocation, setCurrentCellLocation] = useState<CellLocation | undefined>(
		undefined,
	);

	const [daysState, setDaysState] = useState<TurnDay[]>(() => {
		return Array.from({ length: cycleLengthDays }).map((_, index): TurnDay => {
			const day = formDaysRef.current[index];

			return {
				dayIndex: index,
				isOff: day?.isOff ?? false,
				startTime: day?.startTime ?? "",
				endTime: day?.endTime ?? "",
				workShiftId: day?.workShiftId ?? "",
				breakMinutes: day?.breakMinutes ?? 60,
				createdAt: day?.createdAt ?? "",
				deletedAt: day?.deletedAt ?? "",
				deletedBy: day?.deletedBy ?? "",
				updatedAt: day?.updatedAt ?? "",
				id: day?.id ?? "",
				week: turnGridActions.weekLabelsUseCase({ index, type: patternType }),
				total: day?.total ?? "00:00",
				dayCutover: day?.dayCutover ?? "00:00",
				periods: Array.from({ length: periods }).map((_, periodIndex) => {
					const existingPeriod = day?.periods?.[periodIndex];
					return {
						breakMinutes: existingPeriod?.breakMinutes ?? 60,
						endTime: existingPeriod?.endTime ?? "",
						id: existingPeriod?.id ?? "",
						periodIndex: periodIndex + 1,
						startTime: existingPeriod?.startTime ?? "",
						workShiftDayId: existingPeriod?.workShiftDayId ?? "",
					};
				}),
			};
		});
	});

	const isSyncingWithForm = useRef(false);
	const previousValues = useRef({
		cycleLengthDays,
		periods,
		patternType,
	});

	const { handleClearLine, handleDSR, onCellsChanged } = turnGridActions;

	const excessWidthCells = width - (patternType !== TurnTypeEnum.weekly ? 273 : 281);
	const getWidthEntries = useCallback(
		(p: number): number => {
			const periodWidthMap: Record<number, number> = {
				1: excessWidthCells / 2,
				2: excessWidthCells / 4,
				3: excessWidthCells / 6,
				4: excessWidthCells / 8,
				5: excessWidthCells / 10,
				6: excessWidthCells / 12,
			};
			return Math.max(periodWidthMap[p] || 81, 81);
		},
		[excessWidthCells],
	);

	useEffect(() => {
		const prev = previousValues.current;

		const hasChanges =
			prev.cycleLengthDays !== cycleLengthDays ||
			prev.periods !== periods ||
			prev.patternType !== patternType;

		if (!hasChanges) return;

		previousValues.current = {
			cycleLengthDays,
			periods,
			patternType,
		};

		setDaysState((prevDays) => {
			const newDays = Array.from({ length: cycleLengthDays }).map((_, index) => {
				const existingDay = prevDays[index];
				const formDay = formDaysRef.current[index];

				if (existingDay) {
					let periodsList = [...existingDay.periods];

					if (periodsList.length < periods) {
						for (let i = periodsList.length; i < periods; i++) {
							periodsList.push({
								breakMinutes: 60,
								endTime: "",
								id: "",
								periodIndex: i + 1,
								startTime: "",
								workShiftDayId: existingDay.id,
							});
						}
					} else if (periodsList.length > periods) {
						periodsList = periodsList.slice(0, periods);
					}

					return {
						...existingDay,
						dayIndex: index,
						week: turnGridActions.weekLabelsUseCase({ index, type: patternType }),
						periods: periodsList,
					};
				}

				return {
					dayIndex: index,
					isOff: formDay?.isOff ?? false,
					startTime: "",
					endTime: "",
					workShiftId: "",
					breakMinutes: 60,
					createdAt: "",
					deletedAt: "",
					deletedBy: "",
					updatedAt: "",
					id: "",
					week: turnGridActions.weekLabelsUseCase({ index, type: patternType }),
					total: "00:00",
					dayCutover: formDay?.dayCutover ?? "00:00",
					periods: Array.from({ length: periods }).map((_, periodIndex) => ({
						breakMinutes: 60,
						endTime: "",
						id: "",
						periodIndex: periodIndex + 1,
						startTime: "",
						workShiftDayId: "",
					})),
				};
			});

			return newDays;
		});
	}, [cycleLengthDays, periods, patternType]);

	// Sincronização UNIDIRECIONAL: daysState -> form (APENAS quando necessário)
	useEffect(() => {
		// Evita loop infinito
		if (isSyncingWithForm.current) return;

		isSyncingWithForm.current = true;

		form.setValue("days", daysState, {
			shouldDirty: true,
			shouldValidate: false,
			shouldTouch: false,
		});

		setTimeout(() => {
			isSyncingWithForm.current = false;
		}, 0);
	}, [daysState, form]);

	const columns = useMemo(() => {
		const periodCols = Array.from({ length: periods }).flatMap((_, i) => [
			{ columnId: `startTime${i + 1}`, width: getWidthEntries(periods) },
			{
				columnId: `endTime${i + 1}`,
				width: getWidthEntries(periods),
				style: paddingLeft,
			},
		]);

		return [
			{ columnId: "week", width: patternType !== TurnTypeEnum.weekly ? 40 : 48 },
			...periodCols,
			{ columnId: "total", width: 61 },
			{ columnId: "dayCutover", width: 84 },
			{ columnId: "dsr", width: 48 },
			{ columnId: "actions", width: 40 },
		];
	}, [periods, patternType, getWidthEntries, paddingLeft]);

	const resetFocusLocation = useCallback(() => {
		turnGridActions.resetFocus({ setCurrentCellLocation });
	}, []);

	const generateValuesEntries = useCallback(
		(day: TurnDay, style: CellStyle): Array<DefaultCellTypes | HourCell> => {
			if (day.isOff) {
				return Array.from({ length: periods }).flatMap(() => [
					{
						type: "text",
						text: "dsr",
						renderer: () => (
							<Badge className="rounded-md w-[45px] h-[20] px-2 py-0 ml-2">DSR</Badge>
						),
						nonEditable: true,
						style,
					},
					{
						type: "text",
						text: "dsr",
						renderer: () => (
							<Badge className="rounded-md w-[45px] h-[20] px-2 py-0 ml-2">DSR</Badge>
						),
						nonEditable: true,
						style,
					},
				]);
			}
			return Array.from({ length: periods }).flatMap((_, periodIndex) => [
				{
					type: "hour",
					text: day.periods[periodIndex]?.startTime ?? "",
					style,
					resetFocusLocation,
				},
				{
					type: "hour",
					text: day.periods[periodIndex]?.endTime ?? "",
					style,
					resetFocusLocation,
				},
			]);
		},
		[periods, resetFocusLocation],
	);

	const headerRow = useCallback((): Row => {
		const cells: DefaultCellTypes[] = Array.from({ length: periods }).flatMap((_, periodIndex) => [
			{
				type: "header",
				text: `Entrada ${periodIndex + 1}`,
				className: "header-start header-p-left !important",
			},
			{
				type: "header",
				text: `Saída ${periodIndex + 1}`,
				className: "header-start header-p-left !important",
			},
		]);

		return {
			rowId: "header",
			height: 40,
			cells: [
				{ type: "header", text: patternType !== TurnTypeEnum.weekly ? "Dia" : "" },
				...cells,
				{ type: "header", text: "Total" },
				{ type: "header", text: "Virada dia" },
				{ type: "header", text: "DSR" },
				{
					type: "header",
					text: "",
					className: "rounded-tr-lg",
					style: { border: { right: { width: "0px" } } },
				},
			],
		};
	}, [periods, patternType]);

	const rows = useMemo(() => {
		const getRows = (days: TurnDay[]): Row<DefaultCellTypes | HourCell>[] => [
			headerRow(),
			...days.map<Row<DefaultCellTypes | HourCell>>((day, index) => {
				const isLastEntry = days.length - 1 === index;
				const removeLastBottomBorder: CellStyle = {
					border: {
						bottom: {
							width: isLastEntry ? "0px" : "",
						},
					},
				};
				return {
					rowId: index,
					height: 48,
					cells: [
						{
							type: "header",
							text: day.week,
							className: "bg-muted turn-grid-week",
							nonEditable: true,
							style: { ...removeLastBottomBorder, ...paddingLeft },
						},
						...generateValuesEntries(day, removeLastBottomBorder),
						{
							type: "text",
							text: day?.total ?? "00:00",
							nonEditable: true,
							style: cellBorderRemover({ bottom: isLastEntry }),
							renderer: () => (
								<div className="w-full h-full ml-1.5 flex items-center justify-start">
									{day.total}
								</div>
							),
						},
						{
							type: "hour",
							text: day?.dayCutover ?? "00:00",
							nonEditable: day.isOff,
							defaultValue: "00:00",
							style: cellBorderRemover({ bottom: isLastEntry }),
							className: "touch-none",
							resetFocusLocation,
						},
						{
							type: "text",
							text: "",
							renderer: () => (
								<div className="w-full h-full flex justify-center items-center">
									<Switch
										checked={day.isOff}
										onCheckedChange={() => {
											// Marca que é uma atualização interna
											isSyncingWithForm.current = true;
											handleDSR({
												index,
												days: daysState,
												form,
												periods,
												setDays: setDaysState,
											});
											setTimeout(() => {
												isSyncingWithForm.current = false;
											}, 0);
										}}
									/>
								</div>
							),
							nonEditable: true,
							style: cellBorderRemover({ bottom: isLastEntry }),
						},
						{
							type: "text",
							text: "",
							renderer: () => (
								<Button
									variant="ghost"
									type="button"
									disabled={day.isOff}
									className="w-full h-full rounded-none"
									onClick={() => {
										// Marca que é uma atualização interna
										isSyncingWithForm.current = true;
										handleClearLine({
											index,
											days: daysState,
											setDays: setDaysState,
										});
										setTimeout(() => {
											isSyncingWithForm.current = false;
										}, 0);
									}}
								>
									<Eraser className="text-destructive" />
								</Button>
							),
							nonEditable: true,
							className: isLastEntry ? "rounded-br-lg" : "",
							style: cellBorderRemover({ right: true, bottom: isLastEntry }),
						},
					],
				};
			}),
		];

		return getRows(daysState);
	}, [
		daysState,
		periods,
		headerRow,
		generateValuesEntries,
		resetFocusLocation,
		handleDSR,
		handleClearLine,
		form,
		paddingLeft,
	]);

	const totalHourInTurn = useMemo(
		() => turnGridActions.calculateTotals({ days: daysState }) ?? "",
		[daysState],
	);

	useEffect(() => {
		if (!wrapperFormRef.current) return;
		const observer = new ResizeObserver((entries) => {
			setWidth(entries[0].contentRect.width);
		});
		observer.observe(wrapperFormRef.current);
		return () => observer.disconnect();
	}, []);

	return {
		rows,
		columns,
		onCellsChanged,
		totalHourInTurn,
		wrapperFormRef,
		periods,
		daysState,
		setDaysState,
		currentCellLocation,
		setCurrentCellLocation,
		cycleDays: cycleLengthDays,
	};
}
