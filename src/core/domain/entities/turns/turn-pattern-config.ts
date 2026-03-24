import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { TurnTypeEnum } from "./turns";

export interface TurnPatternConfig {
	id: string;
	patternType: TurnTypeEnum;
	displayName: string;
	defaultCycleLengthDays: 0;
	minCycleLengthDays: 0;
	maxCycleLengthDays: 0;
	maxPeriodsPerDay: 6;
	allowsMultiplePeriods: boolean;
	//   validationRules: {}
}

export interface TurnPatternConfigFindAllParams {
	urlParams?: string;
}

export interface TurnPatternConfigFindByIdParams {
	patternConfigId: string;
}

export interface TurnPatternConfigCreateParams {
	body: CreateDto<TurnPatternConfig>;
}

export interface TurnPatternConfigUpdateParams {
	body: EditDto<TurnPatternConfig>;
}

export interface TurnPatternConfigDeleteParams {
	patternConfigId: string;
}
