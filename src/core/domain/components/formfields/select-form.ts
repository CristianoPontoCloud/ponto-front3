import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface SelectClassNamesParams {
	formControl?: string;
	formItem?: string;
}

interface SelectBaseProps<T extends FieldValues> extends FormFieldParams<T> {
	classNames?: SelectClassNamesParams;
	disabled?: boolean;
	HeadGenericComponent?: ReactNode;
}

interface SelectWithData<T extends FieldValues> extends SelectBaseProps<T> {
	datas: { label: string; value: string }[];
	endpoint?: never;
}

interface SelectWithEndpoint<T extends FieldValues> extends SelectBaseProps<T> {
	endpoint: string;
	datas?: never;
}

export type SelectFormFieldParams<T extends FieldValues> =
	| SelectWithData<T>
	| SelectWithEndpoint<T>;
