import type { RequestInstance } from "@/domain/entities/request-instance/request-instance";
import { RequestInstanceTypeEnum } from "@/domain/entities/request-instance/request-instance-type";

export const requestInstanceInitialFormValues: RequestInstance = {
	id: "",
	startDate: null,
	endDate: null,
	collaboratorId: "",
	companyId: "",
	startTime: "",
	endTime: "",
	hoursAdjustment: "",
	justification: "",
	requestId: "",
	type: RequestInstanceTypeEnum.ESPECIFIC_DAY,
};
