import type { StatusDefaultEnum } from "../usecases/status-default";
import type { TimeRegistersDto } from "./time-registers";

export enum EquipmentStatusEnum {
	active = "1",
	inative = "2",
}

export interface Equipment extends TimeRegistersDto {
	id: string;
	name: string;
	status: StatusDefaultEnum;
	mark: EquipmentMark;
	model: EquipmentModel;
	is671: boolean;
	ip: string;
	port: string;
	user: string;
	password: string;
	serialNumber: string;
}

export interface EquipmentDetails extends Equipment {
	companyId: string
	markId: string
	modelId: string
}

export interface EquipmentFormProps extends Omit<EquipmentDetails, keyof TimeRegistersDto | "id" | "mark" | "model"> {
	id?: string;
	markId: string
	modelId: string
}

export interface EquipmentMark extends TimeRegistersDto {
	id: string
	name: string
	status: string
}

export interface EquipmentModel extends TimeRegistersDto {
	id: string
	name: string
	status: string
	mark: EquipmentMark
}
