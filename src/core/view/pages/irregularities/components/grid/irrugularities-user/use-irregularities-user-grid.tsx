import type { IrregularitiesResponse } from "@/domain/entities/irregularities/grid/irregularities-company-grid-type";
import { markPeriodUseCase } from "@/domain/usecases/mark-period-use-case";
import { desconsiderMarksGenerateCell } from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-generate-cell";
import { markHasDesnconsiderCell } from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-helpers";
import { entriesAndOutsGenerateCells } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-cells";
import { entriesAndOutsGenerateCollumns } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-columns";
import { entriesAndOutsGenerateHeaders } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-headers";
import { markDetailsGenerateCells } from "@/view/components/entities/marks/grids/mark-details-generate-cells";
import { markDetailsRenderController } from "@/view/components/entities/marks/grids/mark-details-render-controlers";
import { markGetBgsettingIds } from "@/view/components/entities/marks/grids/mark-get-bg-settings-ids";
import { markGetTotals } from "@/view/components/entities/marks/grids/mark-get-totals";
import { marksGenerateCollumnWidth } from "@/view/components/entities/marks/grids/marks-generate-width-collumns";
import { CenterTextCell } from "@/view/components/react-grid/ui-cells/center-text-cell";
import { TimetrackingGridCollaboratorIconCell } from "@/view/pages/timetracking/components/grids/shared-cells/collaborator-icon-cell";
import { TimetrackingGridHourIconCell } from "@/view/pages/timetracking/components/grids/shared-cells/hour-icon-cell";
import { TimetrackingGridSettingIconCell } from "@/view/pages/timetracking/components/grids/shared-cells/settings-cell/settings-cell";
import type { Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { parse } from "date-fns";
interface UseIrregularitiesUserGridParams {
	response?: IrregularitiesResponse;
	showCollaboratorColumn: boolean;
}
export function useIrregularitiesUserGrid({
	response,
	showCollaboratorColumn,
}: UseIrregularitiesUserGridParams) {
	if (!response)
		return {
			rows: [],
			columns: [],
			fixColumns: undefined,
		};
	// const { columnsToRender } = response;
	// const irregularities = response.irregularities ?? [];
	const { columnsToRender, irregularities, totals } = response;
	// const totals = response.totals ?? [];
	const period = markPeriodUseCase(response.period);
	const hasDesconsiderMark = markHasDesnconsiderCell(irregularities);
	const fixColumns = period * 2 + (showCollaboratorColumn ? 5 : 4);
	function collaboratorCase<T>(trueReturn: T, falseReturn: T): T {
		return showCollaboratorColumn ? trueReturn : falseReturn;
	}
	const getColumns = (): Column[] => {
		const {
			collaboratorMinWidth,
			entriesWidth,
			hourWidth,
			settingsWidth,
			dayMonthWidth,
			dayWeekWidth,
		} = marksGenerateCollumnWidth(irregularities);
		const entries = entriesAndOutsGenerateCollumns({
			period,
			width: entriesWidth,
		});
		return [
			{ columnId: "settings", width: settingsWidth },
			{ columnId: "date", width: dayMonthWidth },
			{ columnId: "dayWeek", width: dayWeekWidth },
			...collaboratorCase<Column[]>(
				[{ columnId: "collaborator", width: collaboratorMinWidth }],
				[],
			),
			{ columnId: "hours", width: hourWidth },
			...entries,
			...markDetailsRenderController.columnIds(columnsToRender),
		];
	};

	const headerRow = (): Row => {
		return {
			rowId: "header",
			height: 40,
			cells: [
				{ type: "header", text: "" },
				{ type: "header", text: "Dia mês", className: "center-header" },
				{ type: "header", text: "Dia semana", className: "center-header" },
				...collaboratorCase<DefaultCellTypes[]>(
					[{ type: "header", text: "Colaborador", className: "header-start" }],
					[],
				),
				{ type: "header", text: "Horário" },
				...entriesAndOutsGenerateHeaders(period),
				...markDetailsRenderController.headers({
					columnsToRender,
					hasDesconsiderMark,
				}),
			],
		};
	};

	const getRows = (): Row<DefaultCellTypes>[] => [
		headerRow(),
		...irregularities.map((value, index): Row<DefaultCellTypes> => {
			const { collaborator, desconsiderMarks, dayFlags, dayWeek, dayMonth, settingIds } = value;
			const date = parse(dayMonth, "yyyy-MM-dd", new Date());
			const hrDetailsCells = markDetailsGenerateCells({
				mark: value,
				hasDesconsiderMark,
				matcher: "irregularities",
			});

			const entries = entriesAndOutsGenerateCells({
				collaborator,
				currentEntryAndOut: value,
				entriesAndOuts: irregularities,
				period,
				date,
				refetchGridValues: () => { },
				index,
			});
			const desconsiderCellCase = desconsiderMarksGenerateCell({
				desconsiderMarks,
				hasDesconsiderMark,
				collaborator,
				refetchGridValues: () => { },
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
								settingIds={settingIds}
								date={dayMonth}
								collaborator={collaborator}
								dayFlags={dayFlags}
							/>
						),
						className: markGetBgsettingIds(dayFlags),
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <CenterTextCell text={dayMonth} className="text-xs" />,
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <CenterTextCell text={dayWeek} />,
					},
					...collaboratorCase<DefaultCellTypes[]>(
						[
							{
								type: "text",
								text: "",
								nonEditable: true,
								renderer: () => <TimetrackingGridCollaboratorIconCell {...collaborator} />,
							},
						],
						[],
					),
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <TimetrackingGridHourIconCell {...collaborator?.turn} />,
					},
					...entries,
					...hrDetailsCells,
					...desconsiderCellCase,
				],
			};
		}),
		markGetTotals({
			fixColumns,
			totals,
		}),
	];

	const rows = getRows();
	const columns = getColumns();

	return {
		rows,
		columns,
		fixColumns,
	};
}
