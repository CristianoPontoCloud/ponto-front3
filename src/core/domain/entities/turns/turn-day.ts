import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { TimeRegistersDto } from "../time-registers";
import type { TurnPeriod } from "./turn-period";

export interface TurnDay extends TimeRegistersDto {
	id: string;
	workShiftId: string;
	dayIndex: number;
	isOff: boolean;
	startTime: string;
	endTime: string;
	breakMinutes: number;
	total: string;
	week: string;
	dayCutover: string;
	periods: TurnPeriod[];
}

export interface TurnDayFindAllParams {
	urlParams?: string;
}

export interface TurnDayFindByIdParams {
	dayId: string;
}

export interface TurnDayCreateParams {
	body: CreateDto<TurnDay>;
}

export interface TurnDayUpdateParams {
	body: EditDto<TurnDay>;
}

export interface TurnDayDeleteParams {
	dayId: string;
}
