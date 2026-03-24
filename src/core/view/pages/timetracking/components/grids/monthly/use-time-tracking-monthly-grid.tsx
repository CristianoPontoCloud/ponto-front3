import type { TimetrackingMonthlyResponse } from "@/domain/entities/time-tracking/grids/mothly";
import { CenterTextCell } from "@/view/components/react-grid/ui-cells/center-text-cell";
import type { CellStyle, Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { useRef } from "react";
import { TimetrackingGridCollaboratorIconCell } from "../shared-cells/collaborator-icon-cell";
import { TimetrackingGridHourIconCell } from "../shared-cells/hour-icon-cell";
interface UseTimetrackingMonthlyGridParams {
	monthlyResponse: TimetrackingMonthlyResponse[];
	gridWidth: number;
}
export function useTimetrackingMonthlyGrid({
	monthlyResponse,
	gridWidth,
}: UseTimetrackingMonthlyGridParams) {
	const wrapperFormRef = useRef<HTMLDivElement | null>(null);
	const borderLeftNone: CellStyle = { border: { right: { width: "0px" } } };
	const getColumns = (): Column[] => {
		const columnsWidth = 98;
		const hourWidth = 66;
		const collaboratorWidth = gridWidth - hourWidth - columnsWidth * 6 - 2;
		return [
			{ columnId: "collaborator", width: collaboratorWidth },
			{ columnId: "hourIcon", width: hourWidth },
			{ columnId: "nrOccurrence", width: columnsWidth },
			{ columnId: "nrRequests", width: columnsWidth },
			{ columnId: "missingHours", width: columnsWidth },
			{ columnId: "extraHours", width: columnsWidth },
			{ columnId: "balanceBank", width: columnsWidth },
			{ columnId: "totalHours", width: columnsWidth },
		];
	};
	const headerRow = (): Row => {
		return {
			rowId: "header",
			height: 40,
			cells: [
				{ type: "header", text: "Colaborador", className: "header-start" },
				{ type: "header", text: "Horário" },
				{ type: "header", text: "Ocorrências  " },
				{ type: "header", text: "Solicitações" },
				{ type: "header", text: "Horas falta" },
				{ type: "header", text: "Horas extra" },
				{ type: "header", text: "Saldo banco" },
				{ type: "header", text: "Horas totais", style: borderLeftNone },
			],
		};
	};
	const getRows = (): Row<DefaultCellTypes>[] => [
		headerRow(),
		...monthlyResponse.map((value, index): Row<DefaultCellTypes> => {
			const {
				balanceBank,
				collaborator,
				extraHours,
				missingHours,
				nrOccurrence,
				nrRequests,
				totalHours,
			} = value;
			const isLastItem = index + 1 === monthlyResponse.length;
			const lastItemStyle = (removeRightBorder: boolean): CellStyle => ({
				border: {
					bottom: {
						width: isLastItem ? "0px" : "",
					},
					right: {
						width: removeRightBorder ? "0px" : "",
					},
				},
			});
			return {
				rowId: index,
				height: 48,
				cells: [
					{
						type: "text",
						text: "",
						nonEditable: true,
						style: lastItemStyle(false),
						renderer: () => <TimetrackingGridCollaboratorIconCell {...collaborator} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <TimetrackingGridHourIconCell {...collaborator.turn} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <CenterTextCell text={nrOccurrence.toString()} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <CenterTextCell text={nrRequests.toString()} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <CenterTextCell text={missingHours} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <CenterTextCell text={extraHours} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(false),
						nonEditable: true,
						renderer: () => <CenterTextCell text={balanceBank} />,
					},
					{
						type: "text",
						text: "",
						style: lastItemStyle(true),
						nonEditable: true,
						renderer: () => <CenterTextCell text={totalHours} />,
					},
				],
			};
		}),
	];
	const rows = getRows();
	const columns = getColumns();
	return {
		rows,
		columns,
		wrapperFormRef,
	};
}
