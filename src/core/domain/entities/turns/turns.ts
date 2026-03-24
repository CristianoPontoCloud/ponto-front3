import type { StatusDefaultEnum } from "@/domain/usecases/status-default";
import type { ValueLabel } from "../../value-label";
import type { EntryAndOutKey } from "../marks/marks";
import type { DsrFormProps } from "./dsr";
import type { NightTurnFormProps } from "./night-turn";
import type { HourParametersFormProps } from "./parameters";
import type { ToleranceFormProps } from "./tolerance";
import type { TurnDay } from "./turn-day";
import type { TurnPolicy } from "./turn-policy";

export enum TurnStatusEnum {
	active = "1",
	inative = "2",
}

export enum TurnTypeEnum {
	weekly = "WEEKLY",
	jorney12x36 = "CYCLIC_12X36",
	scale24x48 = "CYCLIC_24X48",
	scale24x72 = "CYCLIC_24X72",
	jorney = "JORNADA",
	custom = "CUSTOMIZADO",
}

export const TurnsDetails: Record<TurnTypeEnum, string> = {
	[TurnTypeEnum.weekly]: "Semanal",
	[TurnTypeEnum.jorney12x36]: "12x36",
	[TurnTypeEnum.scale24x48]: "24x48",
	[TurnTypeEnum.scale24x72]: "24x72",
	[TurnTypeEnum.jorney]: "Jornada",
	[TurnTypeEnum.custom]: "Customizado",
};

export const turnList: ValueLabel[] = [
	{ value: TurnTypeEnum.weekly, label: "Semanal" },
	{ value: TurnTypeEnum.jorney12x36, label: "12x36" },
	{ value: TurnTypeEnum.scale24x48, label: "24x48" },
	{ value: TurnTypeEnum.scale24x72, label: "24x72" },
	{ value: TurnTypeEnum.jorney, label: "Jornada" },
	{ value: TurnTypeEnum.custom, label: "Customizado" },
];

export function getTypeTurnLabel(type: TurnTypeEnum): string {
	return TurnsDetails[type];
}

export interface Turn {
	id: string;
	name: string;
	patternType: TurnTypeEnum | "";
	periods: string;
	status: StatusDefaultEnum;
	days: TurnDay[];
	companyId: string;
	policyId: string;
}
export interface TurnWithCollaboratorsAndPolicy extends Turn {
	collaborators: number;
	policy: TurnPolicy;
}

export interface TurnDetails
	extends Omit<Turn, "policy">,
	DsrFormProps,
	ToleranceFormProps,
	HourParametersFormProps,
	NightTurnFormProps {
	entriesAndOutDays: TurnEntriesAndOuts[];
	cycleLengthDays: string;
}

export type EntriesAndOutsRecord = Record<EntryAndOutKey, string>;

export interface TurnEntriesAndOuts extends EntriesAndOutsRecord {
	total: string;
	turnDay: string;
	dsr: boolean;
}

export interface TurnFormProps extends Omit<TurnDetails, "id"> {
	id?: string;
}

export type WithTurnId<T = object> = T & {
	turnId: string;
};
