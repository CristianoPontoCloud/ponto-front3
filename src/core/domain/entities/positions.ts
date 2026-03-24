import type { StatusDefaultEnum } from "../usecases/status-default";
import type { TimeRegistersDto } from "./time-registers";

export enum PositionStatusEnum {
	active = "1",
	inative = "2",
}

export interface Position extends TimeRegistersDto {
	id: string;
	name: string;
	collaborators: number;
	status: StatusDefaultEnum;
}
export interface PositionDetails extends Omit<Position, "collaborators"> {
	companyId: string;
}

export interface PositionFormProps
	extends Omit<PositionDetails, keyof TimeRegistersDto | "id"> {
	id?: string;
}
