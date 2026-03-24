import type { ReactElement } from "react";

export interface ValueLabel {
	label: string;
	value: string;
}

export interface ValueLabelIcon extends ValueLabel {
	icon?: ReactElement
}
