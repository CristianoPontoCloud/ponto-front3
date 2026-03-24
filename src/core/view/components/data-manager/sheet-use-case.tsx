import type { FieldValues } from "react-hook-form";
import SheetMain, { type SheetMainParams } from "../sheet/sheet-main";

export interface DataManagerSheetUseCase<T extends FieldValues> {
	sheetParams?: SheetMainParams<T>;
}

export function DataManagerSheetUseCase<T extends FieldValues>({
	sheetParams,
}: DataManagerSheetUseCase<T>) {
	if (!sheetParams) return;
	return <SheetMain {...sheetParams} />;
}
