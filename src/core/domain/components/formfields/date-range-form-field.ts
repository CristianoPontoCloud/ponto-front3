import type { DayPickerBase } from "react-day-picker";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { LabelFormParams } from "./label-form";

export interface DateRangeFormFieldClassNamesParams {
	formControl?: string;
	formItem?: string;
}
export interface DatePickerRangeFormFieldParams<T extends FieldValues>
	extends Omit<LabelFormParams, "hasError"> {
	classNames?: DateRangeFormFieldClassNamesParams;
	disabled?: boolean
	invalidDates?: DayPickerBase['disabled']
	keyDateFrom: Path<T>;
	keyDateTo: Path<T>;
	form: UseFormReturn<T>;
	placeholder?: string;
	align?: "center" | "end" | "start"
}
