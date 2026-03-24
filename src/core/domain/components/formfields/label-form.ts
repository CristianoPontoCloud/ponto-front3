import type { ReactNode } from "react";

export interface LabelFormParams {
	label?: string;
	formFieldName?: string;
	description?: string | ReactNode;
	required?: boolean;
	hasError?: boolean;
	classNameLabel?: string;
	disabled?: boolean
}
