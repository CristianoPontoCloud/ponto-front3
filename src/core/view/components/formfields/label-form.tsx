"use client";
import type { LabelFormParams } from "@/domain/components/formfields/label-form";
import { FormLabel } from "@/view/components/ui/form";
import { Asterisk, CircleHelp } from "lucide-react";
import { tv } from "tailwind-variants";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function LabelForm({
	label,
	description,
	required,
	hasError,
	classNameLabel,
	formFieldName,
	disabled,
}: LabelFormParams) {
	const labelVariants = tv({
		base: `flex gap-1 items-center h-5 truncate ${classNameLabel}`,
		variants: {
			hasError: {
				true: "text-red-500",
				false: "",
			},
		},
	});

	return (
		<FormLabel
			// id={formFieldName}
			className={labelVariants({ hasError: hasError })}
			data-testid={`label-${formFieldName}`}
			htmlFor={formFieldName}
			disabled={disabled}
		>
			{required && <Asterisk className="text-red-500 w-3 h-3" />}
			{label}
			{description && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<CircleHelp className="w-[16px] h-[16px]" id="circle-help" />
						</TooltipTrigger>
						<TooltipContent className="max-w-[400px]">
							<p>{description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</FormLabel>
	);
}
