import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface TimeRangePickerClassNamesParams {
	formControl?: string;
	input?: string;
	formItem?: string;
}

export interface TimeRangePickerFormParams<T extends FieldValues>
	extends Omit<FormFieldParams<T>, "formFieldName"> {
	startTimeKeyForm: Path<T>;
	endTimeKeyForm: Path<T>;
	form: UseFormReturn<T>;
	classNames?: TimeRangePickerClassNamesParams;
}
