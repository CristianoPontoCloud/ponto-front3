import type { ValueLabel } from "@/domain/value-label";
import { tv } from "tailwind-variants";
import { Badge } from "../ui/badge";

export interface StatusViewerParams {
	status: ValueLabel;
	activeStatusRule: string;
}

export function StatusViewer({ status, activeStatusRule }: StatusViewerParams) {
	const statusVariant = tv({
		base: "w-2.5 h-2.5 rounded-full border-[1px] border-muted",
		variants: {
			isActive: {
				true: "bg-lime-500",
				false: "bg-red-500",
			},
		},
	});
	const capitalizeFirstLetterLabel = status.label.charAt(0).toUpperCase() + status.label.slice(1);
	// return (
	// 	<div className="flex gap-2  items-center justify-start">
	// 		<div className={statusVariant({ isActive: status.value === activeStatusRule })} />
	// 		<span className=" text-start text-sm">{capitalizeFirstLetterLabel}</span>
	// 	</div>
	// );
	return (
		<Badge className={statusVariant({ isActive: status.value === activeStatusRule })}>
			{capitalizeFirstLetterLabel}
		</Badge>
	);
}
