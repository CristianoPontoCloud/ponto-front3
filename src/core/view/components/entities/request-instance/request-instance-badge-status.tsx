import {
	RequestInstanceStatusEnum,
	requestInstanceStatusMap,
} from "@/domain/entities/request-instance/request-instance-status";
import { BadgeStatusCustom } from "../../badges/badge-status-custom";

interface BadgeRequestInstanceStatusCustomParams {
	statusValue: RequestInstanceStatusEnum;
}

const { APPROVED, PENDING, REJECTED, CANCELLED } = RequestInstanceStatusEnum;

export const requestInstanceStatusBadgeColor = {
	[APPROVED]: "bg-lime-600/15 text-lime-600",
	[REJECTED]: "bg-red-600/15 text-red-600",
	[PENDING]: "bg-gray-600/15 text-gray-600",
	[CANCELLED]: "bg-gray-600/15 text-gray-600",
};

export function RequestInstanceBadgeStatus({
	statusValue,
}: BadgeRequestInstanceStatusCustomParams) {
	return (
		<BadgeStatusCustom
			colorsByStatus={requestInstanceStatusBadgeColor}
			status={
				requestInstanceStatusMap?.[statusValue] ?? {
					value: "",
					label: "Não encontrado",
				}
			}
		/>
	);
}
