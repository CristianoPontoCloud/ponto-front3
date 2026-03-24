import type { StatusDefaultEnum } from "../usecases/status-default";
import type { ValueLabel } from "../value-label";
import type { TimeRegistersDto } from "./time-registers";

export enum approvalFlowTypeEnum {
	SEQUENTIAL = "SEQUENTIAL",
	PARALLEL = "PARALLEL",
}
const { PARALLEL, SEQUENTIAL } = approvalFlowTypeEnum
export const approvalFlowTypeMap: ValueLabel[] = [
	{
		label: "Paralelo",
		value: PARALLEL
	},
	{
		label: "Sequêncial",
		value: SEQUENTIAL
	}
]
// export function getApprovalFlowByStatus(status: DepartmentApprovalFlow): ValueLabel {
// 	return departamentApprovalFlowMap.find(({ value }) => value === status) as ValueLabel
// }

export interface Department extends TimeRegistersDto {
	id: string;
	name: string;
	approvalFlow: boolean;
	collaborators: number;
	status: StatusDefaultEnum;
	approvalFlowType: approvalFlowTypeEnum;
	usersForApproval: string[];
	offlineMarkings: boolean;
	geographicalDelimitation: boolean;
	unrecognizedPhoto: boolean;
	fakeGPS: boolean;
	requests: boolean;
}

export interface DepartmentDetails extends Omit<Department, "collaborators"> {
	companyId: string
}

export interface DepartmentFormProps
	extends Omit<
		DepartmentDetails,
		keyof TimeRegistersDto
		| "collaborators" | "id"
	> {
	id?: string;
	selectUser: string[]
}

export interface DepartmentFindAllCompanyManagersResponse {
	collaboratorId: string
	collaboratorName: string
	departmentId: string
	departmentName: string
}
