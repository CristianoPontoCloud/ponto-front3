import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface TimePickerWithSecondsClassNamesParams {
	formControl?: string;
	input?: string;
	formItem?: string;
}

export interface TimePickerWithSecondsFormParams<T extends FieldValues>
	extends FormFieldParams<T> {
	formFieldName: Path<T>;
	form: UseFormReturn<T>;
	classNames?: TimePickerWithSecondsClassNamesParams;
}
