import type { Coordinates } from "../address";
import type { TimeRegistersDto } from "../time-registers";
import type { RequestManagementStatusEnum } from "./request-management-status";

export enum RequestManagementTypeEnum {
	REQUEST = "REQUEST",
	OFFLINE_MARK = "OFFLINE_MARK",
	GEO_DELIMITATION = "GEO_DELIMITATION",
	FAKE_GPS = "FAKE_GPS",
	NO_RECOGNIZE_PHOTO = "NO_RECOGNIZE_PHOTO",
}

export interface RequestManagement extends TimeRegistersDto {
	id: string;
	collaborator: {
		id: string;
		name: string;
		position: string;
		src?: string;
	};
	expectedDelimitation?: Coordinates;
	actualDelimitation?: Coordinates;
	radius?: number;
	name: string;
	dateStart: string;
	timeStart: string;
	dateEnd?: string;
	timeEnd?: string;
	requestId: string;
	type: RequestManagementTypeEnum;
	status: RequestManagementStatusEnum;
	collaboratorObservation: string;
	rejectedBy?: {
		id: string;
		name: string;
		position: string;
	};
	acceptedBy?: {
		id: string;
		name: string;
		position: string;
	};
	justify?: string;
}
export interface RequestManagementFormProps
	extends Omit<
		RequestManagement,
		"dateStart" | "dateEnd" | "updatedAt" | "deletedAt" | "deletedBy"
	> {
	dateStart: Date | null;
	dateEnd: Date | null;
}
