import type { DesconsiderMarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";
import type { DefaultCellTypes } from "@silevis/reactgrid";
import { MarkDesconsiderMarkCell } from "../entries-cells/desconsider-mark-cell";

interface DesconsiderMarksGenerateCellParams {
	hasDesconsiderMark: boolean;
	desconsiderMarks: DesconsiderMarkFormProps[];
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	// entryKey: EntryAndOutKey;
	refetchGridValues: () => void;
}
export function desconsiderMarksGenerateCell({
	hasDesconsiderMark,
	desconsiderMarks,
	collaborator,
	// entryKey,
	refetchGridValues,
}: DesconsiderMarksGenerateCellParams): DefaultCellTypes[] {
	function desconsiderMarksCells(): DefaultCellTypes | undefined {
		if (!hasDesconsiderMark) return;
		if (desconsiderMarks.length < 1) {
			return {
				type: "text",
				text: "",
				nonEditable: true,
				style: cellBorderRemover({ right: true }),
			};
		}
		return {
			type: "text",
			text: "teste",
			nonEditable: true,
			renderer: () => (
				<MarkDesconsiderMarkCell
					type="reconsider"
					desconsiderMarks={desconsiderMarks}
					collaborator={collaborator}
					refetchGridValues={refetchGridValues}
					// entryKey={entryKey}
				/>
			),
			style: cellBorderRemover({ right: true }),
		};
	}
	const desconsiderCell = desconsiderMarksCells();
	const desconsiderCellCase = desconsiderCell ? [desconsiderCell] : [];

	return desconsiderCellCase;
}
