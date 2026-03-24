import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface SwitchFormParams<T extends FieldValues> {
	formFieldName: Path<T>;
	label?: string;
	form: UseFormReturn<T>;
	className?: string;
	classNameLabel?: string;
	disabled?: boolean;
}
