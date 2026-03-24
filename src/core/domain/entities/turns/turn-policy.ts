import type { CreateDto, EditDto } from "@/domain/http/http-client";

export interface TurnPolicy {
	id: string;
	compensationModeCode: string;
	deducingFromExtraTimeModeCode: string;
	extraHourCalculationModeCode: string;
	freeLunchCode: string;
	extraTimeUnderAnHourCode: string;
	workingModeCode: string;
	absenceToleranceInMinutes: string;
	punchingToleranceInMinutes: string;
	dailyMinimumExtraHoursInMinutes: string;
	dailyMinimumAbsentInMinutes: string;
	actionUponSurpassingExtraTimeLimitCode: string;
	actionUponSurpassingAbsenceLimitCode: string;
	dsrTimingCode: string;
	dsrDiscountingCode: string;
	dsrHolidayDiscountingCode: string;
	nightlyShiftStartTimeCode: string;
	nightlyShiftEndTimeCode: string;
	nightlyFactorCode: string;
	cycleLengthDays: string;
	extendedNightlyShiftCode: string;
	sundaysAndHolidaysOnTurnOfDayCode: string;
	// appliedExtraTimePercentualInterJorney: string;
	// maximumAbsencesInHoliday: string;
	// dayCutover: string;
	// cycleAnchorDate: string;
	// nrPeriods: string;
}

export interface TurnPolicyFindAllParams {
	urlParams?: string;
}

export interface TurnPolicyFindByIdParams {
	policyId: string;
}

export interface TurnPolicyCreateParams {
	body: CreateDto<TurnPolicy>;
}

export interface TurnPolicyUpdateParams {
	body: EditDto<TurnPolicy>;
}

export interface TurnPolicyDeleteParams {
	policyId: string;
}
