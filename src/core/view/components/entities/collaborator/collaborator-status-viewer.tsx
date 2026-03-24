import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import {
	StatusViewerCustom,
	type StatusViewerCustomParams,
} from "../../status-viewer/status-viewer-custom";

type CollaboratorStatusViewerCustomParams = Pick<StatusViewerCustomParams, "status">;

export const collaboratorStatusColor = {
	[`${CollaboratorStatusEnum.active}`]: "bg-lime-500",
	[`${CollaboratorStatusEnum.inactive}`]: "bg-red-500",
	[`${CollaboratorStatusEnum.dismissed}`]: "bg-gray-300",
};

export function CollaboratorStatusViewer({ status }: CollaboratorStatusViewerCustomParams) {
	return <StatusViewerCustom colorsByStatus={collaboratorStatusColor} status={status} />;
}
