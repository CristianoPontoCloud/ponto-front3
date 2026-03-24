import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface LabelErrorFormParams<T extends FieldValues> {
	formFieldName: string;
	form: UseFormReturn<T>;
}
