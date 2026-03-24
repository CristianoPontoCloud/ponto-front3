import type { DayPickerBase } from "react-day-picker";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface MonthPickerFormFieldClassNamesParams {
	formControl?: string;
	buttonTrigger?: string;
	formItem?: string
}
export interface MonthPickerFormFieldParams<T extends FieldValues>
	extends FormFieldParams<T> {
	classNames?: MonthPickerFormFieldClassNamesParams;
	disabled?: boolean
	label?: string
	placeholder?: string
	invalidDates?: DayPickerBase['disabled']
}
