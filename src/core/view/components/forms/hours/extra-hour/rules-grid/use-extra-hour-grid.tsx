import { daysOfWeekSelectsToText } from "@/domain/components/formfields/week-days-select-form-field";
import { getExtraHourAccumulated } from "@/domain/entities/extra-hour/enums/extra-hour-accumulated-enum";
import {
	getExtraHourDay,
	getExtraHourHoliday,
} from "@/domain/entities/extra-hour/enums/extra-hour-days-enum";
import { getExtraHourNight } from "@/domain/entities/extra-hour/enums/extra-hour-nightly-enum";
import type { ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { TurnEntriesAndOuts } from "@/domain/entities/turns/turns";
import { Button } from "@/view/components/ui/button";
import type { Column, Row } from "@silevis/reactgrid";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { extraHourRulesGridController } from "./extra-hour-grid-controller";

interface UseExtraGridParams {
	form: UseFormReturn<ExtraHourFormProps>;
	actions: extraHourRulesGridController;
}

export interface TurnDetails extends TurnEntriesAndOuts {
	week: string;
}

export function useExtraHourGrid({ form, actions }: UseExtraGridParams) {
	const wrapperFormRef = useRef<HTMLDivElement | null>(null);
	const offsetWidthRef = wrapperFormRef.current?.offsetWidth;
	const [width, setWidth] = useState<number>(offsetWidthRef ?? 0);
	const rules: ExtraHourRules[] = form.watch("rules");
	const bracketsIsEmpty = rules?.length === 0;
	const initialEntriesValue: ExtraHourRules[] =
		rules?.map((values) => {
			return values;
		}) ?? [];
	const [bracketsState, setRulesState] = useState<ExtraHourRules[]>(initialEntriesValue);

	const getColumns = (): Column[] => {
		const sequenceWidth = 100
		const editWidth = 82
		const deletewidth = 80
		const totalToSubtract = sequenceWidth + editWidth + deletewidth
		const columnsWidth = (width - totalToSubtract) / 5;
		return [
			{ columnId: "sequence", width: sequenceWidth },
			{ columnId: "days", width: columnsWidth },
			{ columnId: "nightly", width: columnsWidth },
			{ columnId: "holiday", width: columnsWidth },
			{ columnId: "specificDays", width: columnsWidth },
			{ columnId: "accumulated", width: columnsWidth },
			{ columnId: "edit", width: editWidth },
			{ columnId: "delete", width: deletewidth },
		];
	};

	// Função para gerar o cabeçalho da grid
	const headerRow = (): Row => {
		return {
			rowId: "header",
			height: 48,
			cells: [
				{ type: "header", text: "Sequência" },
				{ type: "header", text: "Dias" },
				{ type: "header", text: "Feriado" },
				{ type: "header", text: "Noturno" },
				{ type: "header", text: "Dia específico" },
				{ type: "header", text: "Acúmulo" },
				{ type: "header", text: "" },
				{ type: "header", text: "" },
			],
		};
	};

	function MoveCellsUi({ index }: { index: number }) {
		const disableFirstMoveUpButton = index === 0;
		const disableLastBottomMoveButton = index + 1 === rules.length;
		const rowNumber = (index + 1).toString().padStart(2, "0");
		return (
			<div className="w-full h-full flex">
				<div className="flex h-full w-5/12 items-center justify-center">{rowNumber}</div>
				<div className="flex h-full w-7/12 items-center justify-center border-l border-l-border gap-1">
					<Button
						size="icon"
						variant="ghost"
						className="hover w-5"
						type="button"
						disabled={disableFirstMoveUpButton}
						onClick={() => actions.handleMoveRuleUp(index)}
					>
						<ArrowUp />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						className="hover w-5"
						type="button"
						disabled={disableLastBottomMoveButton}
						onClick={() => actions.handleMoveRuleDown(index)}
					>
						<ArrowDown />
					</Button>
				</div>
			</div>
		);
	}

	function EditCellsUi({ index }: { index: number }) {
		return (
			<Button
				variant="link"
				type="button"
				className="w-full h-full rounded-none"
				onClick={() => actions.editRule(index)}
			>
				Gerenciar
			</Button>
		);
	}

	function DeleteRule({ index }: { index: number }) {
		return (
			<Button
				variant="ghost"
				className="w-full h-full rounded-none text-destructive"
				type="button"
				onClick={() => actions.deleteRule(index)}
			>
				<Trash />
			</Button>
		);
	}

	const getRows = (details: ExtraHourRules[]): Row[] => [
		headerRow(),
		...(details ?? []).flatMap<Row>(
			({ accumulated, day, holiday, nightly, specificDays }, index) => ({
				rowId: index,
				height: 48,
				cells: [
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <MoveCellsUi index={index} />,
					},
					{ type: "text", text: getExtraHourDay(day).label, nonEditable: true },
					{ type: "text", text: getExtraHourHoliday(holiday).label, nonEditable: true },
					{ type: "text", text: getExtraHourNight(nightly).label, nonEditable: true },
					{
						type: "text",
						text: daysOfWeekSelectsToText(specificDays),
						nonEditable: true,
					},
					{ type: "text", text: getExtraHourAccumulated(accumulated).label, nonEditable: true },
					{
						type: "text",
						text: "",
						renderer: () => <EditCellsUi index={index} />,
						nonEditable: true,
					},
					{
						type: "text",
						text: "",
						renderer: () => <DeleteRule index={index} />,
						nonEditable: true
					},
				],
			}),
		),
	];

	const rows = getRows(bracketsState);
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
		setRulesState(rules);
	}, [rules]);

	return {
		rows,
		columns,
		wrapperFormRef,
		bracketsState,
		bracketsIsEmpty,
	};
}
