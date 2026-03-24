import type { ValueLabel } from "@/domain/value-label";
import { Badge } from "../ui/badge";

export interface BadgeStatusCustomParams {
	status: ValueLabel;
	colorsByStatus: Record<string, string>;
}

export function BadgeStatusCustom({ status, colorsByStatus }: BadgeStatusCustomParams) {
	const bgcolor = colorsByStatus[status.value] || "bg-gray-400/15 text-gray-400";

	// const capitalizeFirstLetterLabel = status.label.charAt(0).toUpperCase() + status.label.slice(1);
	return <Badge className={`${bgcolor}`}>{status.label}</Badge>;
}
