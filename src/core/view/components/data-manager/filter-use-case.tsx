import FiltersController, { type FiltersControllerParams } from "../filter/filter-controller";

export interface DataManagerFilterUseCase {
	filterParams?: FiltersControllerParams;
}

export function DataManagerFilterUseCase({ filterParams }: DataManagerFilterUseCase) {
	if (!filterParams) return;
	return <FiltersController {...filterParams} />;
}
