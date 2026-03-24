import type { StatusDefaultEnum } from "@/domain/usecases/status-default";
import type { ExtraHourRules, ExtraHourRulesNumberMultiplier } from "./extra-hour-rules";

export enum ExtraHourStatusEnum {
	active = "1",
	inative = "2",
}

export interface ExtraHour {
	id: string;
	name: string;
	// collaborators: number;
	status: StatusDefaultEnum;
}

export interface ExtraHourWithRulesIds extends ExtraHour {
	extraTimeRuleIds: string[];
}

export interface ExtraHourDetails extends Omit<ExtraHour, "collaborators" | "rules"> {
	rules: ExtraHourRules[];
	companyId: string;
}

export interface ExtraHourDetailsNumberMultiplier extends Omit<ExtraHour, "collaborators" | "rules"> {
	rules: ExtraHourRulesNumberMultiplier[];
	companyId: string;
}

export interface ExtraHourFormProps extends Omit<ExtraHourDetails, "id"> {
	id?: string;
}
