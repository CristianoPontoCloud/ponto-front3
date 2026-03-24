import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface CheckboxFormParams<T extends FieldValues> {
	label: string;
	formFieldName: Path<T>;
	form: UseFormReturn<T>;
	classNameFormItem?: string;
	classNameLabel?: string;
	disable?: boolean;
}
