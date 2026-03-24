import type { CreateDto, EditDto } from "@/domain/http/http-client";

export interface TurnPeriod {
	id: string;
	workShiftDayId: string;
	startTime: string;
	periodIndex: number;
	endTime: string;
	breakMinutes: number;
}

export interface TurnPeriodFindAllParams {
	urlParams?: string;
}

export interface TurnPeriodFindByIdParams {
	periodId: string;
}

export interface TurnPeriodCreateParams {
	body: CreateDto<TurnPeriod>;
}

export interface TurnPeriodUpdateParams {
	body: EditDto<TurnPeriod>;
}

export interface TurnPeriodDeleteParams {
	periodId: string;
}
