import type { StatusDefaultEnum } from "../usecases/status-default";
import type { ValueLabel } from "../value-label";
import type { TimeRegistersDto } from "./time-registers";

export enum DismissalStatusEnum {
	active = "1",
	inative = "2",
}

export interface Dismissal extends TimeRegistersDto {
	id: string;
	name: string;
	status: StatusDefaultEnum;
	applicant: string
	companyId: string
}

export type DismissalDetails = Dismissal

export interface DismissalFormProps
	extends Omit<DismissalDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}

export const dismissalReasondMap: ValueLabel[] = [
	{ label: "Justa Causa", value: "Justa Causa" },
	{ label: "Sem Justa Causa", value: "Sem Justa Causa" },
	{ label: "Funcionario Solicitou Desligamento", value: "Funcionario Solicitou Desligamento" },
	{ label: "Redução de Custos", value: "Redução de Custos" }
]
export const dismissalApplicantMap: ValueLabel[] = [
	{ label: "Colaborador", value: "Colaborador" },
	{ label: "Empregador", value: "Empregador" },
]
