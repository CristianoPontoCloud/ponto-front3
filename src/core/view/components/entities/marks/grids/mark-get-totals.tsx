import type { MarkDetailsFields } from "@/domain/entities/marks/marks";
import { CenterTextCell } from "@/view/components/react-grid/ui-cells/center-text-cell";
import type { CellStyle, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { entriesAndOutsGetBg } from "./entries-and-outs/entries-and-out-background-color-case";

interface MarkGetTotalsParams {
	totals: MarkDetailsFields;
	fixColumns: number;
}

export function markGetTotals({ totals, fixColumns }: MarkGetTotalsParams): Row<DefaultCellTypes> {
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
	const arrTotals = Object.values(totals);
	const totalValues: DefaultCellTypes[] = arrTotals.map((value, index) => {
		return {
			type: "text",
			text: "",
			nonEditable: true,
			renderer: () => <CenterTextCell text={value} className="bg-text text-muted-foreground" />,
			style: styleCell(index + 1 === arrTotals.length),
			className: entriesAndOutsGetBg(),
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
}
