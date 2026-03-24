import type { StatusDefaultEnum } from "../usecases/status-default";
import type { TimeRegistersDto } from "./time-registers";

export enum CostCenterStatusEnum {
	active = "1",
	inative = "2",
}

export interface CostCenter extends TimeRegistersDto {
	id: string;
	name: string;
	status: StatusDefaultEnum;
}

export interface CostCenterDetails extends Omit<CostCenter, "status"> {
	status: StatusDefaultEnum;
	companyId: string
}

export interface CostCenterFormProps extends Omit<CostCenterDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}
