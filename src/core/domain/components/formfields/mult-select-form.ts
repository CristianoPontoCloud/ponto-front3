import type { MultiSelectProps } from "@/view/components/ui/multi-select";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface MultSelectClassNamesParams {
	formControl?: string;
	formItem?: string;
	multSelect?: string;
}

interface MultiSelectBaseProps<T extends FieldValues> extends Omit<FormFieldParams<T>, "form">,
	Omit<
		MultiSelectProps,
		"form" | "defaultValue" | "onValueChange" | "className" | "options"
	> {
	classNames?: MultSelectClassNamesParams;
	disabled?: boolean;
	form: FormFieldParams<T>["form"];
}

interface MultiSelectWithData<T extends FieldValues> extends MultiSelectBaseProps<T> {
	options: MultiSelectProps["options"];
	endpoint?: never;
}

interface MultiSelectWithEndpoint<T extends FieldValues> extends MultiSelectBaseProps<T> {
	endpoint: string;
	options?: never;
}

export type MultiSelectFormFieldParams<T extends FieldValues> =
	| MultiSelectWithData<T>
	| MultiSelectWithEndpoint<T> & { maxLines?: number };

// export interface MultiSelectFormFieldParams<T extends FieldValues>
// 	extends Omit<FormFieldParams<T>, "form">,
// 	Omit<
// 		MultiSelectProps,
// 		"form" | "defaultValue" | "onValueChange" | "className"
// 	> {
// 	classNames?: MultSelectClassNamesParams;
// 	disabled?: boolean;
// 	endpoint: string
// 	form: FormFieldParams<T>["form"];
// }
