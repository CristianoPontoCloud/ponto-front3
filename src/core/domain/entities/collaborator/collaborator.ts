import type { StatusDefaultEnum } from "@/domain/usecases/status-default";
import type { DevicePermission } from "../access-profile";
import type { CompanyDetails } from "../companies";
import type { DepartmentDetails } from "../department";
import type { PositionDetails } from "../positions";
import type { TimeRegistersDto } from "../time-registers";
import type { TurnTypeEnum } from "../turns/turns";
import type { CollaboratorStatusEnum } from "./collaborator-status";

export interface Collaborator {
	id: string;
	name: string;
	surname: string;
	email: string;
	company: CompanyDetails | null;
	department: DepartmentDetails | null;
	position: PositionDetails | null;
	status: CollaboratorStatusEnum;
	imageUrl: string
	registerMark: boolean
	cpf: string
}

export interface CollaboratorWorkdayExtraHour {
	endDate: Date | null
	startDate: Date | null
	observation?: string
	extraHourName: string
	extraHourId: string
}

export interface CollaboratorWorkdayHourBank {
	endDate: Date | null
	startDate: Date | null
	observation?: string
	hourBankName: string
	hourBankId: string
}

export interface WorkShiftAssignment {
	createdAt: string
	cycleOffset: number
	deletedAt: string
	endDate: string
	id: string
	isTemporary: boolean
	obs: string
	startDate: string
	workShift: {
		createdAt: string
		cycleLengthDays: number
		deletedAt: string | null
		deletedBy: string | null
		effectiveFrom: string
		effectiveTo: string | null
		id: string
		minimumIntervalValue: string
		name: string
		patternType: TurnTypeEnum
		status: StatusDefaultEnum
		updatedAt: string | null
	}
}

export enum CollaboratorMarkupEnum {
	MOBILE = "MOBILE",
	WEB = "WEB",
	CUSTOM = "CUSTOM"
}

export interface CollaboratorDetails extends Collaborator, TimeRegistersDto {
	image?: Array<File>
	pis: string;
	hasNoPis: boolean;
	cpf: string;
	dtAdmission: Date | null;
	dtStartSystem: Date | null;
	costCenter: string;
	positionTrust: string;
	registration: string;
	sheet: string;
	ctps: string;
	clt: string;
	rg: string;
	dtBirthday: Date;
	gender: string;
	nationality: string;
	placeOfBirth: string;
	civilState: string;
	socialName: string;
	cnh: string;
	categoryCnh: string;
	dtMaturityCnh: Date;
	zipcode: string;
	neighborhood: string;
	street: string;
	code: string;
	city: string;
	state: string;
	telephone: string;
	extension: string;
	cell: string;
	whatsApp: string;
	fathersName: string;
	fathersTelephone: string;
	mothersName: string;
	mothersTelephone: string;
	extraTimes: {
		id: string,
		name: string,
		status: StatusDefaultEnum,
		createdAt: string,
		updatedAt: string,
		deletedAt: string | null,
		deletedBy: string | null,
		companyId: string | null,
		extraTimeRuleIds: string[]
	}[],
	extraHours: CollaboratorWorkdayExtraHour[]
	hourBanks: CollaboratorWorkdayHourBank[]
	markupDefault: CollaboratorMarkupEnum;
	perfil: string;
	username: string;
	password: string;
	alterPasswordFirstLogin: boolean;
	geo: string[];
	fuso: string;
	web: DevicePermission;
	mobile: DevicePermission;
	workShiftAssignments: WorkShiftAssignment[]
}

export interface CollaboratorFormProps extends Omit<CollaboratorDetails, 'id' | 'department' | 'company' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'deletedBy'> {
	id?: string;
	department: string
	company: string
	position: string
}
