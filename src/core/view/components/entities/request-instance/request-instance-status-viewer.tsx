import { RequestInstanceStatusEnum } from "@/domain/entities/request-instance/request-instance-status";
import {
	StatusViewerCustom,
	type StatusViewerCustomParams,
} from "../../status-viewer/status-viewer-custom";

export type RequestInstanceStatusViewerCustomParams = Pick<StatusViewerCustomParams, "status">;

export const requestInstanceStatusViewerColor = {
	[`${RequestInstanceStatusEnum.APPROVED}`]: "bg-lime-500",
	[`${RequestInstanceStatusEnum.REJECTED}`]: "bg-red-500",
	[`${RequestInstanceStatusEnum.PENDING}`]: "bg-gray-300",
};

export function RequestInstanceStatusViewer({ status }: RequestInstanceStatusViewerCustomParams) {
	return <StatusViewerCustom colorsByStatus={requestInstanceStatusViewerColor} status={status} />;
}
