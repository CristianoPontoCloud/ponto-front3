import type { ExtraHourAccumulatedEnum } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import type { ExtraHourBand } from "@/domain/entities/extra-hour/extra-hour-band";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { TurnEntriesAndOuts } from "@/domain/entities/turns/turns";
import type { AccumulatedHourCell } from "@/view/components/react-grid/cells/accumulated-hour-cells";
import type { PercentCell } from "@/view/components/react-grid/cells/percent-cells";
import { Switch } from "@/view/components/ui/switch";
import type { CellStyle, Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { MoveRight, Trash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "../../../../ui/button";
import { extraHourRangeManagerGridController } from "./range-manager-grid-controller";

interface UseExtraHourRuleManagerGridParams {
	form: UseFormReturn<ExtraHourRules>;
	overSheetIsOpen: boolean;
}

type RulesManagerRow = Row<DefaultCellTypes | PercentCell | AccumulatedHourCell>;

export interface TurnDetails extends TurnEntriesAndOuts {
	week: string;
}

export function useExtraHourRuleManagerGrid({
	form,
	overSheetIsOpen,
}: UseExtraHourRuleManagerGridParams) {
	const wrapperFormRef = useRef<HTMLDivElement | null>(null);
	const offsetWidthRef = wrapperFormRef.current?.offsetWidth;
	const [width, setWidth] = useState<number>(offsetWidthRef ?? 0);
	const bands: ExtraHourBand[] = form.watch("bands");
	const accumulated = form.watch("accumulated") as ExtraHourAccumulatedEnum;

	const rulesIsEmpty = bands?.length === 0;
	const initialEntriesValue: ExtraHourBand[] = bands?.map((values) => {
		return values;
	});

	const [rulesState, setRulesState] = useState<ExtraHourBand[]>(initialEntriesValue);

	const rulesController = useMemo(
		() => new extraHourRangeManagerGridController(form, setRulesState),
		[form],
	);

	const getColumns = (): Column[] => {
		const columnsWidth = (width - 293) / 3;
		return [
			{ columnId: "", width: 80 },
			{ columnId: "startHour", width: columnsWidth },
			{ columnId: "percentageAddition", width: columnsWidth },
			{ columnId: "eventCode", width: columnsWidth },
			{ columnId: "isHourBank", width: 120 },
			{ columnId: "", width: 80 },
		];
	};

	const headerRow = (): Row => {
		return {
			rowId: "header",
			height: 48,
			cells: [
				{ type: "header", text: "" },
				{ type: "header", text: "Considerar extra" },
				{ type: "header", text: "Porcentagem de acréscimo (%)" },
				{ type: "header", text: "Código do evento" },
				{ type: "header", text: "Banco de horas" },
				{ type: "header", text: "", style: { border: { right: { width: "0px" } } } },
			],
		};
	};

	function BankHourSwitch({ checked, index }: { checked: boolean; index: number }) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Switch checked={checked} onClick={() => rulesController.handleBankHour(index)} />
			</div>
		);
	}
	function OrdinalEnumerating({ index }: { index: number }) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<span>{`${index + 1}ª`}</span>
			</div>
		);
	}
	function DeleteRule({ index }: { index: number }) {
		return (
			<Button
				variant="ghost"
				className="w-full h-full rounded-none text-destructive"
				type="button"
				disabled={index === 0}
				onClick={() => rulesController.deleteRule(index)}
			>
				<Trash />
			</Button>
		);
	}
	function ConsiderExtraCell({ fromTime, toTime }: { fromTime: string; toTime: string }) {
		return (
			<div
				className={`flex justify-around items-center h-full w-full  ${fromTime === "" ? "text-muted-foreground dark:text-muted-foreground" : "dark:text-white"}`}
			>
				{fromTime === "" ? "00:00" : fromTime}
				<MoveRight />
				{toTime}
			</div>
		);
	}

	function EventCodeCell({ eventCode }: { eventCode: string }) {
		return (
			<div
				className={`flex justify-start items-center h-full w-full  ${eventCode === "" ? "text-muted-foreground dark:text-muted-foreground " : "dark:text-white"}`}
			>
				<span>{eventCode === "" ? "Insira o código do evento" : eventCode}</span>
			</div>
		);
	}

	const getRows = (bands: ExtraHourBand[]): RulesManagerRow[] => {
		const isFirstRule = (index: number) => index === 0;
		return [
			headerRow(),
			...(bands?.flatMap<RulesManagerRow>((rule, index) => {
				const { isHourBank, eventCode, fromTime, percentageMultiplier, toTime } = rule;
				const isLastRule = bands?.length - 1 === index;
				const removeLastBottomBorder: CellStyle = {
					border: {
						bottom: {
							width: isLastRule ? "0px" : "",
						},
					},
				};
				return {
					rowId: index,
					height: 48,
					cells: [
						{
							type: "text",
							text: "",
							nonEditable: true,
							renderer: () => (
								<OrdinalEnumerating index={index} key={`enumerating-${index.toString()}`} />
							),
							style: removeLastBottomBorder,
						},
						{
							type: "accumulatedHour",
							text: "",
							nonEditable: isFirstRule(index),
							toTime: toTime,
							maxhour: rulesController.getMaxHour().num,
							defaultValue: "000:00",
							renderer: () => (
								<ConsiderExtraCell
									key={`consider-extra-cell-${index.toString()}`}
									fromTime={fromTime}
									toTime={toTime}
								/>
							),
							style: removeLastBottomBorder,
						},
						{
							type: "percent",
							text: percentageMultiplier,
							style: removeLastBottomBorder,
						},
						{
							type: "text",
							text: "",
							renderer: () => <EventCodeCell eventCode={eventCode} />,
							style: removeLastBottomBorder,
						},
						{
							type: "text",
							text: "",
							nonEditable: true,
							renderer: () => (
								<BankHourSwitch
									checked={isHourBank}
									index={index}
									key={`bank-hour-switch-${index.toString()}`}
								/>
							),
							style: removeLastBottomBorder,
						},
						{
							type: "text",
							text: "",
							renderer: () => <DeleteRule key={`delete-bands-${index.toString()}`} index={index} />,
							nonEditable: isFirstRule(index),
							style: {
								border: {
									...removeLastBottomBorder.border,
									right: {
										width: "0px",
									},
								},
							},
						},
					],
				};
			}) ?? []),
		];
	};

	const rows = getRows(rulesState);
	const columns = getColumns();

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(entry.contentRect.width);
			}
		});
		if (wrapperFormRef.current) {
			observer.observe(wrapperFormRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, [offsetWidthRef]);

	useEffect(() => {
		setRulesState(bands);
	}, [bands]);

	useEffect(() => {
		form.reset();
	}, [overSheetIsOpen, form]);

	useEffect(() => {
		rulesController.onAccumulationChanged();
	}, [accumulated, rulesController]);

	return {
		rows,
		columns,
		wrapperFormRef,
		rulesState,
		rulesIsEmpty,
		rulesController,
		setRulesState,
	};
}
