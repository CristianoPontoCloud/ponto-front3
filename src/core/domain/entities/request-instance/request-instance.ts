import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { StatusDefaultEnum } from "@/domain/usecases/status-default";
import type { CollaboratorDetails } from "../collaborator/collaborator";
import type { RequestDetails } from "../request";
import type { TimeRegistersDto } from "../time-registers";
import type { RequestInstanceStatusEnum } from "./request-instance-status";
import type { RequestInstanceTypeEnum } from "./request-instance-type";

export interface RequestInstance {
	id: string;
	requestId: string;
	collaboratorId: string;
	companyId: string;
	type: RequestInstanceTypeEnum;
	startDate: string | Date | null;
	endDate: string | Date | null;
	startTime: string;
	endTime: string;
	hoursAdjustment: string;
	justification: string;
}

export interface RequestInstanceApprovedOrRejectBy {
	id: string;
	username: string;
	phone: string | null;
	email: string;
	status: StatusDefaultEnum;
	isCompanyAdmin: boolean;
	isResellerAdmin: boolean;
	lastLogin: string;
	cpf: string;
	temporaryAccessCode: string | null;
	temporaryCodeExpiry: string | null;
	requiresPasswordReset: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	deletedBy: string | null;
	lastAccessedCompany: string;
	userRoleIds: string[];
}

export interface RequestInstanceDetails extends RequestInstance, TimeRegistersDto {
	status: RequestInstanceStatusEnum;
	approvalJustification: string | null;
	approvedAt: string | null;
	approvedById: string | null;
	approvedBy: RequestInstanceApprovedOrRejectBy | null;
	rejectedBy: RequestInstanceApprovedOrRejectBy | null;
	cancelledAt: string | null;
	cancelledById: string | null;
	createdById: string | null;
	deletedById: string | null;
	rejectedAt: string | null;
	rejectedById: string | null;
	rejectionJustification: string | null;
	isAutoRejection: boolean;
	collaborator: CollaboratorDetails;
	request: RequestDetails;
}

export type RequestInstanceFindAllByCollaboratorParamsDto = FilteredParamsDto &
	Required<Pick<FilteredParamsDto, "collaboratorId">>;

export type RequestInstanceFindAllPendingParamsDto = FilteredParamsDto &
	Required<Pick<FilteredParamsDto, "companyId">>;
