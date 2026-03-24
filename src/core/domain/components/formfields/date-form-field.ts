import type { DayPickerBase } from "react-day-picker";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface DateFormFieldClassNamesParams {
	formControl?: string;
	formItem?: string;
}
export interface DateFormFieldParams<T extends FieldValues>
	extends FormFieldParams<T> {
	classNames?: DateFormFieldClassNamesParams;
	disabled?: boolean
	invalidDates?: DayPickerBase['disabled']
}
