import type { StatusDefaultEnum } from "../usecases/status-default";
import type { TimeRegistersDto } from "./time-registers";

export enum HourBankStatusEnum {
	active = "1",
	inative = "2",
}

export interface HourBank extends TimeRegistersDto {
	id: string;
	name: string;
	extraHour: number;
	collaborators: number;
	status: StatusDefaultEnum;
	startDate: string;
	endDate: string;
}

export interface HourBankDetails extends Omit<HourBank, "collaborators" | "extraHour" | "endDate" | "startDate"> {
	startDate: Date | null;
	endDate: Date | null;
	resetDBEveryXMonths: string;
	discountAbsences: boolean;
	discountLateArrivals: boolean;
	discountEarlyDeparture: boolean;
	companyId: string
}

export interface HourBankFormProps
	extends Omit<HourBankDetails, keyof TimeRegistersDto | "id" | "status"> {
	id?: string;
	status: StatusDefaultEnum;
}
