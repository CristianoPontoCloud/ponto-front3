import type { DefaultCellTypes } from "@silevis/reactgrid";

export function entriesAndOutsGenerateHeaders(period: number) {
	return Array.from({ length: period > 6 ? 6 : period }).flatMap(
		(_, periodIndex): DefaultCellTypes[] => [
			{ type: "header", text: `Ent. ${periodIndex + 1}`, className: "center-header" },
			{ type: "header", text: `Sai. ${periodIndex + 1}`, className: "center-header" },
		],
	);
}
