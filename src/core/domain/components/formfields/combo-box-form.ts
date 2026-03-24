import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface ComboboxClassNamesParams {
	formControl?: string;
	formItem?: string;
	popoverContent?: string
	buttonTrigger?: string
	commandList?: string
}

export interface ComboboxBaseProps<T extends FieldValues>
	extends FormFieldParams<T> {
	classNames?: ComboboxClassNamesParams;
	disabled?: boolean;
	IconLeftOnList?: ReactNode
	isLoading?: boolean
}


interface ComboboxWithData<T extends FieldValues> extends ComboboxBaseProps<T> {
	datas: { label: string; value: string }[];
	endpoint?: never;
}

interface ComboboxWithEndpoint<T extends FieldValues> extends ComboboxBaseProps<T> {
	endpoint: string;
	datas?: never;
}

export type ComboboxFormFieldParams<T extends FieldValues> =
	| ComboboxWithData<T>
	| ComboboxWithEndpoint<T>;
