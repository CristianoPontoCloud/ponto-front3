import type { StatusDefaultEnum } from "../usecases/status-default";
import type { ValueLabel } from "../value-label";
import type { TimeRegistersDto } from "./time-registers";

export enum RequestStatusEnum {
	active = "1",
	inative = "2",
}

export enum RequestTypeEnum {
	ALL_DAY = "Dia Inteiro",
	SPECIFIC_PERIOD = "Período Especifico",
	HOUR_ADJUSTMENT = "Ajuste de Horas"
}

export interface Request extends TimeRegistersDto {
	id: string;
	name: string;
	status: StatusDefaultEnum;
	abbreviation: string;
	type: RequestTypeEnum;
	computeAs: string;
	discountDSR: boolean;
	makeAvailableCollaborator: boolean;
}

export interface RequestDetails extends Request {
	companyId: string
}

export interface RequestFormProps
	extends Omit<RequestDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}

const { ALL_DAY, HOUR_ADJUSTMENT, SPECIFIC_PERIOD } = RequestTypeEnum


export const requestTypeMap: ValueLabel[] = [
	{ label: SPECIFIC_PERIOD, value: SPECIFIC_PERIOD },
	{ label: ALL_DAY, value: ALL_DAY },
	{ label: HOUR_ADJUSTMENT, value: HOUR_ADJUSTMENT }
]

export const requestComputeAsMap: ValueLabel[] = [
	{ label: "Hora Trabalhada", value: "Hora Trabalhada" },
	{ label: "Hora Falta", value: "Hora Falta" },
	{ label: "Não Computar", value: "Não Computar" },
	{ label: "Abono", value: "Abono" }
]
