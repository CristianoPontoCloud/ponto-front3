import type { ValueLabel } from "@/domain/value-label";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams } from "./input-form-field";

export interface SelectTabsClassNamesParams {
	tabsList?: string
	trigger?: string
	tabs?: string
	formItem?: string
}
export interface SelectTabsFormFieldParams<T extends FieldValues>
	extends Omit<FormFieldParams<T>, 'placeholder' | 'disable'> {
	options: ValueLabel[];
	classNames?: SelectTabsClassNamesParams;
	disabled?: boolean;
}
