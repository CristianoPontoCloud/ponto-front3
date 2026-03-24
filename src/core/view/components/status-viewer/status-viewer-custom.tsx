import type { ValueLabel } from "@/domain/value-label";

export interface StatusViewerCustomParams {
	status: ValueLabel;
	colorsByStatus: Record<string, string>;
}

export function StatusViewerCustom({ status, colorsByStatus }: StatusViewerCustomParams) {
	const bgcolor = colorsByStatus[status.value] || "bg-gray-400";

	const capitalizeFirstLetterLabel = status.label.charAt(0).toUpperCase() + status.label.slice(1);
	return (
		<div className="w-fit flex gap-2 items-center justify-start">
			<div
				id="status-color"
				className={`w-2.5 h-2.5 rounded-full border-[1px] border-muted ${bgcolor}`}
			/>
			<span className=" text-start text-sm">{capitalizeFirstLetterLabel}</span>
		</div>
	);
}
