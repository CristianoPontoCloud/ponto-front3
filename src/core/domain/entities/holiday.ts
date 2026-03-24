import type { StatusDefaultEnum } from "../usecases/status-default";
import type { TimeRegistersDto } from "./time-registers";

export enum HolidayStatusEnum {
	active = "1",
	inative = "2",
}
export interface Holiday extends TimeRegistersDto {
	id: string;
	name: string;
	date: string;
	status: StatusDefaultEnum;
	collaboratorLinks: string[];
	departmentLinks: string[];
	repeatHolidaysAllYears: boolean;
}

export interface HolidayDetails extends Omit<Holiday, "date"> {
	date: Date | null
	companyId: string
}

export interface HolidayFormProps
	extends Omit<HolidayDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}
