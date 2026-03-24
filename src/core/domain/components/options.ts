import type { ButtonProps } from "@/view/components/ui/button";

export interface Option {
	label: string;
	// content: ReactNode
	className?: string;
	onClick: () => void;
	hasSeparator?: boolean;
	isDisable?: boolean;
}
export interface OptionsParams {
	label?: string;
	buttonTrigger?: {
		className?: string;
		variant?: ButtonProps["variant"];
	};
	classNameDropdownMenuTrigger?: string;
	classNameDropDownContent?: string;
	options: Option[];
}
