"use client";
import { ListFilter } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import type { FiltersControllerParams } from "../filter/filter-controller";
import FiltersController from "../filter/filter-controller";
import type { SheetMainParams } from "../sheet/sheet-main";
import { Button } from "../ui/button";
import { DataManagerSearch } from "./search";
import { DataManagerSheetUseCase } from "./sheet-use-case";

export interface SearchFilterBarParams<T extends FieldValues> {
	renderingSearch?: boolean;
	renderingFilterButton?: boolean;
	filterParams?: FiltersControllerParams;
	sheetParams?: SheetMainParams<T>;
	rederingFilterController?: boolean;
	className?: string;
}

export default function DataManager<T extends FieldValues>({
	filterParams,
	renderingFilterButton = false,
	renderingSearch = true,
	rederingFilterController = true,
	sheetParams,
	className = "",
}: SearchFilterBarParams<T>) {
	return (
		<div className={`w-full flex gap-2 justify-end ${className}`} data-testid="data-manager-div">
			<DataManagerSearch renderingSearch={renderingSearch} />
			{renderingFilterButton && (
				<Button variant="outline" size="icon" type="button">
					<ListFilter />
				</Button>
			)}
			{rederingFilterController && <FiltersController {...filterParams} />}
			<DataManagerSheetUseCase sheetParams={sheetParams} />
			{/* <SheetMain {...sheetParams} /> */}
		</div>
	);
}
