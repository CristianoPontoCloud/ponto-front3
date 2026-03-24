import type { ExtraHourAccumulatedEnum } from "./enums/extra-hour-accumulated-enum";
import type { ExtraHourDayEnum } from "./enums/extra-hour-days-enum";
import type { ExtraHourHolidayEnum } from "./enums/extra-hour-holidays-enum";
import type { ExtraHourNightlyEnum } from "./enums/extra-hour-nightly-enum";
import type { ExtraHourBand, ExtraHourBandNumberPercentage } from "./extra-hour-band";

export interface ExtraHourRules {
	id?: string;
	ruleIndex: number;
	day: ExtraHourDayEnum;
	holiday: ExtraHourHolidayEnum;
	nightly: ExtraHourNightlyEnum;
	specificDays: string[];
	accumulated: ExtraHourAccumulatedEnum;
	bands: ExtraHourBand[];
}

export interface ExtraHourRulesNumberMultiplier extends Omit<ExtraHourRules, "bands"> {
	bands: ExtraHourBandNumberPercentage[];
}

export interface ExtraHourRulesFilteredParamsDto {
	name?: string;
	page?: string;
	limit?: string;
	status?: string;
	companyId?: string;
	parentCompanyId?: string;
	extraHourId?: string;
}
