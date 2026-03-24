import type { MarkDailyResponse } from "@/domain/entities/marks/mark-view-daily-data";
import { markPeriodUseCase } from "@/domain/usecases/mark-period-use-case";
import { desconsiderMarksGenerateCell } from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-generate-cell";
import {
	markDesconsiderGenerateColumn,
	markDesconsiderGenerateHeader,
	markHasDesnconsiderCell,
} from "@/view/components/entities/marks/grids/desconsider/desconsider-marks-helpers";
import { entriesAndOutsGenerateCells } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-cells";
import { entriesAndOutsGenerateCollumns } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-columns";
import { entriesAndOutsGenerateHeaders } from "@/view/components/entities/marks/grids/entries-and-outs/entries-and-outs-generate-headers";
import { markDetailsGenerateCells } from "@/view/components/entities/marks/grids/mark-details-generate-cells";
import { markDetailsRenderController } from "@/view/components/entities/marks/grids/mark-details-render-controlers";
import { markGetBgsettingIds } from "@/view/components/entities/marks/grids/mark-get-bg-settings-ids";
import { markGetTotals } from "@/view/components/entities/marks/grids/mark-get-totals";
import { marksGenerateCollumnWidth } from "@/view/components/entities/marks/grids/marks-generate-width-collumns";
import type { Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
import { TimetrackingGridCollaboratorIconCell } from "../shared-cells/collaborator-icon-cell";
import { TimetrackingGridHourIconCell } from "../shared-cells/hour-icon-cell";
import { TimetrackingGridSettingIconCell } from "../shared-cells/settings-cell/settings-cell";
interface UseTimetrakingDailyGridParams {
	dailyResponse?: MarkDailyResponse;
}
export function useTimetrakingDailyGrid({ dailyResponse }: UseTimetrakingDailyGridParams) {
	const { headerForm, refetchGridValues } = useContextTimeTracking();
	if (!dailyResponse)
		return {
			rows: [],
			columns: [],
			fixColumns: undefined,
		};
	const { columnsToRender } = dailyResponse;
	const timetrackings = dailyResponse.timetrackings ?? [];
	const totals = dailyResponse.totals ?? [];
	const period = markPeriodUseCase(dailyResponse.period);
	const hasDesconsiderMark = markHasDesnconsiderCell(timetrackings);
	const fixColumns = period * 2 + 3;
	const getColumns = (): Column[] => {
		const { collaboratorMinWidth, desconsiderMarkWidth, entriesWidth, hourWidth, settingsWidth } =
			marksGenerateCollumnWidth(timetrackings);
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
			{ columnId: "collaborator", width: collaboratorMinWidth },
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
				{ type: "header", text: "" },
				{ type: "header", text: "Colaborador", className: "header-start" },
				{ type: "header", text: "Horário" },
				...entriesAndOutsGenerateHeaders(period),
				...markDetailsRenderController.headers({
					columnsToRender,
					hasDesconsiderMark,
				}),
				...markDesconsiderGenerateHeader(hasDesconsiderMark),
			],
		};
	};

	const getRows = (): Row<DefaultCellTypes>[] => [
		headerRow(),
		...timetrackings.map((value, index): Row<DefaultCellTypes> => {
			const { collaborator, desconsiderMarks, dayFlags, settingIds } = value;
			const date = headerForm.watch("dailyDate") ?? new Date();
			const hrDetailsCells = markDetailsGenerateCells({
				mark: value,
				hasDesconsiderMark,
				matcher: "daily",
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
							<TimetrackingGridSettingIconCell collaborator={collaborator} dayFlags={dayFlags} settingIds={settingIds} />
						),
						className: markGetBgsettingIds(dayFlags),
					},
					{
						type: "text",
						text: "",
						nonEditable: true,
						renderer: () => <TimetrackingGridCollaboratorIconCell {...collaborator} />,
					},
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
