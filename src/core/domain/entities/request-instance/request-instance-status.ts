import type { ValueLabel } from "@/domain/value-label";

export enum RequestInstanceStatusEnum {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	CANCELLED = "CANCELLED",
}

const { APPROVED, CANCELLED, PENDING, REJECTED } = RequestInstanceStatusEnum;
export const requestInstanceStatusList: ValueLabel[] = [
	{
		label: "Aceita",
		value: APPROVED,
	},
	{
		label: "Rejeitada",
		value: REJECTED,
	},
	{
		label: "Pendente",
		value: PENDING,
	},
	{
		label: "Cancelado",
		value: CANCELLED,
	},
];

export const requestInstanceStatusMap: Record<RequestInstanceStatusEnum, ValueLabel> = {
	[APPROVED]: {
		label: "Aceita",
		value: APPROVED,
	},
	[REJECTED]: {
		label: "Rejeitada",
		value: REJECTED,
	},
	[PENDING]: {
		label: "Pendente",
		value: PENDING,
	},
	[CANCELLED]: {
		label: "Cancelado",
		value: CANCELLED,
	},
};

export function getRequestInstanceStatus(status: RequestInstanceStatusEnum) {
	return requestInstanceStatusMap[status];
}
