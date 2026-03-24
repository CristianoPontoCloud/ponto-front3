import { type StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { tv } from "tailwind-variants";

export interface StatusViewerParams {
	status: StatusDefaultEnum;
	activeStatusRule: string;
	pronoun?: "female" | "male";
}

export function StatusViewer({ status, activeStatusRule, pronoun = "male" }: StatusViewerParams) {
	const statusVariant = tv({
		base: "w-2.5 h-2.5 rounded-full border-[1px] border-muted",
		variants: {
			isActive: {
				true: "bg-lime-500",
				false: "bg-red-500",
			},
		},
	});

	const { label, value } = getStatus(status);

	const capitalizeFirstLetterLabel = label.charAt(0).toUpperCase() + label.slice(1);
	const labelFormateToPronoun =
		pronoun === "female"
			? capitalizeFirstLetterLabel.replace(/o/g, "a")
			: capitalizeFirstLetterLabel;
	return (
		<div className="flex gap-2 items-center justify-start w-[61px]">
			<div id="status-color" className={statusVariant({ isActive: value === activeStatusRule })} />
			<span className="text-start text-sm">{labelFormateToPronoun}</span>
		</div>
	);
}
