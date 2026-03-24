import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { BadgeStatusCustom } from "../../badges/badge-status-custom";

interface BadgeCollaboratorStatusCustomParams {
	statusValue: CollaboratorStatusEnum;
}

export const collaboratorStatusColor = {
	[`${CollaboratorStatusEnum.active}`]: "bg-lime-600/15 text-lime-600",
	[`${CollaboratorStatusEnum.inactive}`]: "bg-red-600/15 text-red-600",
	[`${CollaboratorStatusEnum.dismissed}`]: "bg-gray-600/15 text-gray-600",
};

export const collaboratorStatusMap = {
	[`${CollaboratorStatusEnum.active}`]: {
		value: CollaboratorStatusEnum.active,
		label: "Ativo",
	},
	[`${CollaboratorStatusEnum.inactive}`]: {
		value: CollaboratorStatusEnum.inactive,
		label: "Inativo",
	},
	[`${CollaboratorStatusEnum.dismissed}`]: {
		value: CollaboratorStatusEnum.dismissed,
		label: "Demitido",
	},
};

export function CollaboratorBadgeStatus({ statusValue }: BadgeCollaboratorStatusCustomParams) {
	return (
		<BadgeStatusCustom
			colorsByStatus={collaboratorStatusColor}
			status={
				collaboratorStatusMap?.[statusValue] ?? {
					value: "",
					label: "Não encontrado",
				}
			}
		/>
	);
}
