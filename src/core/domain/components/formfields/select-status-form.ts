import type { ValueLabel } from "@/domain/value-label";
import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface SelectStatusClassNamesParams {
	formControl?: string;
	formItem?: string;
}
export interface SelectStatusFormFieldParams<T extends FieldValues>
	extends FormFieldParams<T> {
	customDatas?: ValueLabel[];
	customStatus?: {
		value: string;
		color: string;
	}[]
	classNames?: SelectStatusClassNamesParams;
	disabled?: boolean;
	HeadGenericComponent?: ReactNode
}
