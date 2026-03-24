import type { Column } from "@silevis/reactgrid";

interface EntriesAndOutsCollumnsGenerateParams {
	period: number;
	width: number;
}

export function entriesAndOutsGenerateCollumns({
	period,
	width,
}: EntriesAndOutsCollumnsGenerateParams) {
	return Array.from({ length: period > 6 ? 6 : period }).flatMap((): Column[] => [
		{ columnId: "header", width },
		{ columnId: "header", width },
	]);
}
