import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormPostParams {
	FormComponent: React.ElementType;
	useform: UseFormReturn<FieldValues, any, undefined>;
	onSubmit: (data: any) => void;
	labelOnSubmitButton: string;
}
