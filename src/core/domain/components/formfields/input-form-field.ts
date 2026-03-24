import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { LabelFormParams } from "./label-form";

export interface InputFormClassNamesParams {
	formControl?: string;
	input?: string;
	formItem?: string;
}

export interface FormFieldParams<T extends FieldValues>
	extends Omit<LabelFormParams, "hasError"> {
	formFieldName: Path<T>;
	form: UseFormReturn<T>;
	placeholder?: string;
}

export interface InputFormParams<T extends FieldValues>
	extends FormFieldParams<T>,
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
	classNames?: InputFormClassNamesParams;
	OutsideLeftChild?: React.ElementType;
	OutsideRightChild?: React.ElementType;
	onlyNumbers?: boolean;
	rightNote?: string;
	HeadGenericComponent?: ReactNode

}
