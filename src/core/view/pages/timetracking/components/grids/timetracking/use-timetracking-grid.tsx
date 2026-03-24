import type { MarkTimetrackingResponse } from "@/domain/entities/marks/mark-view-timetracking-data";
import { MarkStatusEnum } from "@/domain/entities/marks/marks";
import { markPeriodUseCase } from "@/domain/usecases/mark-period-use-case";
import { desconsiderMarksGenerateCell } from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-generate-cell";
import {
	markDesconsiderGenerateColumn,
	markDesconsiderGenerateHeader,
	markHasDesnconsiderCell,
} from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-helpers";
import { entriesAndOutsGetBg } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-out-background-color-case";
import { entriesAndOutsGenerateCells } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-cells";
import { entriesAndOutsGenerateCollumns } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-columns";
import { entriesAndOutsGenerateHeaders } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-headers";
import { markDetailsGenerateCells } from "@/view/components/entities/marks/grids/mark-details-generate-cells";
import { markDetailsRenderController } from "@/view/components/entities/marks/grids/mark-details-render-controlers";
import { markGetBgsettingIds } from "@/view/components/entities/marks/grids/mark-get-bg-settings-ids";
import { marksGenerateCollumnWidth } from "@/view/components/entities/marks/grids/marks-generate-width-collumns";
import { CenterTextCell } from "@/view/components/react-grid/ui-cells/center-text-cell";
import type { CellStyle, Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { format, parse } from "date-fns";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
import { TimetrackingGridHourIconCell } from "../shared-cells/hour-icon-cell";
import { TimetrackingGridSettingIconCell } from "../shared-cells/settings-cell/settings-cell";
const { ptBR } = require("date-fns/locale/pt-BR");

interface UseTimetrackingGridParams {
	timetrackingResponse?: MarkTimetrackingResponse;
}
export function useTimetrackingGrid({ timetrackingResponse }: UseTimetrackingGridParams) {
	const { refetchGridValues } = useContextTimeTracking();
	if (!timetrackingResponse)
		return {
			rows: [],
			columns: [],
			fixColumns: undefined,
		};
	const { columnsToRender, timetrackings, totals } = timetrackingResponse;
	const period = markPeriodUseCase(timetrackingResponse.period);
	const hasDesconsiderMark = markHasDesnconsiderCell(timetrackings);
	const fixColumns = period * 2 + 4;
	const getColumns = (): Column[] => {
		const {
			dayMonthWidth,
			dayWeekWidth,
			desconsiderMarkWidth,
			entriesWidth,
			hourWidth,
			settingsWidth,
		} = marksGenerateCollumnWidth(timetrackings);
		const entries = entriesAndOutsGenerateCollumns({
			period,
			width: entriesWidth,
		});

		const desconsiderMarkColumn = markDesconsiderGenerateColumn({
			width: desconsiderMarkWidth,
			hasDesconsiderMark,
		});
		return [
			{ columnId: "settings", width: settingsWidth },
			{ columnId: "dayMonth", width: dayMonthWidth },
			{ columnId: "dayWeek", width: dayWeekWidth },
			{ columnId: "hours", width: hourWidth },
			...entries,
			...markDetailsRenderController.columnIds(columnsToRender),
			...desconsiderMarkColumn,
		];
	};

	const headerRow = (): Row => {
		return {
			rowId: "header",
			height: 40,
			cells: [
				{ type: "header", text: "", className: "center-header" },
				{ type: "header", text: "Dia mês", className: "center-header" },
				{ type: "header", text: "Dia semana", className: "center-header" },
				{ type: "header", text: "Horário", className: "center-header" },
				...entriesAndOutsGenerateHeaders(period),
				...markDetailsRenderController.headers({
					columnsToRender,
					hasDesconsiderMark,
				}),
				...markDesconsiderGenerateHeader(hasDesconsiderMark),
			],
		};
	};

	const getTotals = (): Row<DefaultCellTypes> => {
		const styleCell = (removeRightBorder: boolean): CellStyle => ({
			border: {
				bottom: {
					width: "0px",
				},
				right: {
					width: removeRightBorder ? "0px" : "",
				},
			},
		});
		const arrTotals = Object.values(totals ?? []);
		const totalValues: DefaultCellTypes[] = arrTotals.map((value, index) => {
			return {
				type: "text",
				text: "",
				nonEditable: true,
				renderer: () => <CenterTextCell text={value} className="bg-text text-muted-foreground" />,
				style: styleCell(index + 1 === arrTotals.length),
				className: entriesAndOutsGetBg(MarkStatusEnum.normal),
			};
		});
		const voidCells: DefaultCellTypes[] = Array.from({ length: fixColumns - 1 }).map(() => ({
			type: "header",
			text: "",
		}));

		return {
			rowId: "totals",
			height: 40,
			cells: [
				{
					type: "header",
					text: "Totais",
					nonEditable: true,
					colspan: fixColumns,
					style: styleCell(false),
					className: "header-start",
				},
				...voidCells,
				...totalValues,
			],
		};
	};

	const getRows = (): Row<DefaultCellTypes>[] => [
		headerRow(),
		...timetrackings.map((value, index): Row<DefaultCellTypes> => {
			const { dayMonth, desconsiderMarks, dayFlags, collaborator, turn, settingIds } = value;

			const date = parse(dayMonth, "yyyy-MM-dd", new Date());
			const formatedDate = format(date, "dd/MM/yyyy");
			const dayWeekUnformated = format(date, "EEEE", { locale: ptBR }).split("-")[0];
			const dayWeek = dayWeekUnformated.charAt(0).toUpperCase() + dayWeekUnformated.slice(1);

			const hrDetailsCells = markDetailsGenerateCells({
				mark: value,
				hasDesconsiderMark,
				matcher: "timetracking",
			});
			const entries = entriesAndOutsGenerateCells({
				collaborator,
				currentEntryAndOut: value,
				period,
				date,
				refetchGridValues,
				entriesAndOuts: timetrackings,
				index,
			});
			const desconsiderCellCase = desconsiderMarksGenerateCell({
				desconsiderMarks,
				hasDesconsiderMark,
				collaborator,
				refetchGridValues,
			});

			return {
				rowId: index,
				height: 48,
				cells: [
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => (
							<TimetrackingGridSettingIconCell
								date={dayMonth}
								collaborator={collaborator}
								dayFlags={dayFlags}
								settingIds={settingIds}
							/>
						),
						className: markGetBgsettingIds(dayFlags),
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <CenterTextCell text={formatedDate} className="text-xs" />,
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <CenterTextCell text={dayWeek} />,
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <TimetrackingGridHourIconCell {...turn} />,
					},
					...entries,
					...hrDetailsCells,
					...desconsiderCellCase,
				],
			};
		}),
		getTotals(),
	];

	const rows = getRows();
	const columns = getColumns();

	return {
		rows,
		columns,
		fixColumns,
	};
}
