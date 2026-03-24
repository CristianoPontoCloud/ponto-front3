import type { TimeFormat } from "@/domain/entities/time";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface TimepickerClassNamesParams {
	formControl?: string;
	input?: string;
	formItem?: string;
}

export interface TimePickerFormParams<T extends FieldValues>
	extends FormFieldParams<T> {
	formFieldName: Path<T>;
	form: UseFormReturn<T>;
	classNames?: TimepickerClassNamesParams;
	minTime?: TimeFormat;
	maxTime?: TimeFormat;
	disabled?: boolean
}
