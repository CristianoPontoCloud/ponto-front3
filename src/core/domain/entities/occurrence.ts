import type { StatusDefaultEnum } from "../usecases/status-default";
import type { ValueLabel } from "../value-label";
import type { TimeRegistersDto } from "./time-registers";

export enum OccurrenceStatusEnum {
	active = "1",
	inative = "2",
}

export interface Occurrence extends TimeRegistersDto {
	id: string;
	name: string;
	status: StatusDefaultEnum;
	field: ValueLabel;
	considerFrom: string;
	controllerOccurrence: boolean;
}

export interface OccurrenceDetails
	extends Omit<Occurrence, "field"> {
	field: string;
	companyId: string;
}

export interface OccurrenceFormProps
	extends Omit<OccurrenceDetails, keyof TimeRegistersDto | "id"> {
	field: string;
	id?: string;
}

export const occurrenceFieldMap: ValueLabel[] = [
	{ label: "Total Trabalhado", value: "Total Trabalhado" },
	{ label: "Dia Falta", value: "Dia Falta" },
	{ label: "Atraso Entrada", value: "Atraso Entrada" },
	{ label: "Horas Atraso Diurno", value: "Horas Atraso Diurno" },
	{ label: "Horas Atraso Noturno", value: "Horas Atraso Noturno" },
	{ label: "Falta (período)", value: "Falta (período)" },
	{ label: "Interjornada", value: "Interjornada" },
	{ label: "Extra Intervalo", value: "Extra Intervalo" },
	{ label: "Entrada Antecipada", value: "Entrada Antecipada" },
	{ label: "Banco Cred/Deb", value: "Banco Cred/Deb" },
	{ label: "Banco Positivo", value: "Banco Positivo" },
	{ label: "Banco Negativo", value: "Banco Negativo" },
	{ label: "Intervalos Menores que xx Minutos", value: "Intervalos Menores que xx Minutos" },
	{ label: "Intervalos Maiores que xx Minutos", value: "Intervalos Maiores que xx Minutos" },
	{ label: "Jornada Maior que xx Minutos Consecutivos", value: "Jornada Maior que xx Minutos Consecutivos " }
]

