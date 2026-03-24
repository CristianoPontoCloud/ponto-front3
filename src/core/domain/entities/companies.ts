import type { LoginResponse } from "../authentication/signin";
import type { StatusDefaultEnum } from "../usecases/status-default";
import type { Delimitations } from "./delimitation";
import type { TimeRegistersDto } from "./time-registers";

export interface Company extends TimeRegistersDto {
	id: string;
	name: string;
	fantasyName: string;
	cnpj: string
	status: StatusDefaultEnum;
	collaboratorIds: string[]
}


export enum CompanyStatusEnum {
	active = "1",
	inative = "2",
}

export interface CompanyDetails extends Company {
	delimitations: Delimitations
	zip: string
	neighborhood: string
	street: string
	number: string
	city: string
	state: string
	complement: string
	status: StatusDefaultEnum
	nsr: string | null
	ie: string | null
	ceicno: string | null
	caepf: string | null
	sheetCode: string | null
	startDay: string | null
	responsibleName: string
	responsibleSurname: string
	responsibleEmail: string
	responsibleCpf: string | null
	trade: string | null
	resellerId: string | null
	isReseller: false
	radius: string | null
	planId: string
	timeZone: string
	size: number
	countryPhoneCode: string
	departmentIds: string[]
	positionIds: string[]
	centerCostIds: string[],
	color: string
}

export interface CreateCompanyResponse extends Omit<LoginResponse, "company"> {
	company: CompanyDetails,
}

export interface CompanyFormProps
	extends Omit<CompanyDetails, keyof TimeRegistersDto | "id"> {
	id?: string
	parentCompanyId: string
}
