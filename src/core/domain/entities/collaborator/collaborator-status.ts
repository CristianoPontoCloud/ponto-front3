import type { ValueLabel } from "@/domain/value-label"

export enum CollaboratorStatusEnum {
	active = 'ACTIVE',
	inactive = 'INACTIVE',
	dismissed = 'DISMISSED',
	// any = 'ANY'
}

export const collaboratorStatusDefaultList: ValueLabel[] = [
	{
		label: "Ativos",
		value: CollaboratorStatusEnum.active,
	},
	{
		label: "Inativos",
		value: CollaboratorStatusEnum.inactive,
	},
	{
		label: "Demitidos",
		value: CollaboratorStatusEnum.dismissed,
	},
]

export const collaboratorStatusDefaultMap: Record<CollaboratorStatusEnum, ValueLabel> = {
	[`${CollaboratorStatusEnum.active}`]: {
		label: "Ativo",
		value: CollaboratorStatusEnum.active,
	},
	[`${CollaboratorStatusEnum.inactive}`]: {
		label: "Inativo",
		value: CollaboratorStatusEnum.inactive,
	},
	[`${CollaboratorStatusEnum.dismissed}`]: {
		label: "Demitidos",
		value: CollaboratorStatusEnum.dismissed,
	},
	// [`${CollaboratorStatusEnum.any}`]: {
	// 	label: "Todos",
	// 	value: CollaboratorStatusEnum.any,
	// }
}


export function getCollaboratorStatus(status: CollaboratorStatusEnum) {
	return collaboratorStatusDefaultMap[status]
}
