import type { StatusDefaultEnum } from "../usecases/status-default";
import type { ValueLabel } from "../value-label";
import type { TimeRegistersDto } from "./time-registers";

export enum OnCallStatusEnum {
	active = "1",
	inative = "2",
}
export enum OnCallTypeEnum {
	allDay = "1",
	period = "2",
}

export interface OnCall extends TimeRegistersDto {
	id: string;
	name: string;
	type: ValueLabel;
	collaborators: number;
	status: StatusDefaultEnum;
}

export interface OnCallDetails extends Omit<OnCall, "collaborators" | "type"> {
	type: string;
	// date: Date | null;
	initialDate: Date | null;
	finalDate: Date | null;
	initialTime: string;
	finalTime: string;
	obs: string;
	departmentIds: string[];
	collaboratorIds: string[];
	turnIds: string[];
	companyId: string
}

export interface OnCallFormProps
	extends Omit<OnCallDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}
