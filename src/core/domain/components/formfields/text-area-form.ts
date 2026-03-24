import type { FieldValues } from "react-hook-form";
import type { FormFieldParams, InputFormClassNamesParams } from "./input-form-field";

export interface TextAreaFormParams<T extends FieldValues>
	extends FormFieldParams<T>,
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
	classNames?: InputFormClassNamesParams;
}
