import type {
	RequestInstance,
	RequestInstanceDetails,
	RequestInstanceFindAllByCollaboratorParamsDto,
	RequestInstanceFindAllPendingParamsDto,
} from "@/domain/entities/request-instance/request-instance";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { JustificationDto } from "@/domain/shared/justification";
import type { ReasonDto } from "@/domain/shared/reason";
import type { RequestInstanceApproveUseCaseDto } from "../usecases/request-instance/request-instance-approve";
import type { RequestInstanceCancelUseCaseDto } from "../usecases/request-instance/request-instance-cancel";
import type { RequestInstaceCreateUseCaseDto } from "../usecases/request-instance/request-instance-create";
import type { RequestInstanceDeleteUseCaseDto } from "../usecases/request-instance/request-instance-delete";
import type { RequestInstanceFilteredUseCaseDto } from "../usecases/request-instance/request-instance-filtered";
import type { RequestInstanceFindAllByCollaboratorUseCaseDto } from "../usecases/request-instance/request-instance-find-all-by-collaborator";
import type { RequestInstanceFindAllPendingUseCaseDto } from "../usecases/request-instance/request-instance-find-all-pending";
import type { RequestInstanceFindByIdUseCaseDto } from "../usecases/request-instance/request-instance-find-by-id";
import type { RequestInstanceReasonUseCaseDto } from "../usecases/request-instance/request-instance-reason";
import type { RequestInstanceRejectUseCaseDto } from "../usecases/request-instance/request-instance-reject";
import type { RequestInstanceUpdateUseCaseDto } from "../usecases/request-instance/request-instance-update";

type PaginationRequestInstance = PaginationDto<RequestInstanceDetails[]>;

interface RequestInstanceFacadeDto {
	findById(collaboratorId: string): Promise<RequestInstanceDetails | null>;
	filtered(params?: FilteredParamsDto): Promise<PaginationRequestInstance>;
	findAllByCollaborator(
		params: RequestInstanceFindAllByCollaboratorParamsDto,
	): Promise<PaginationRequestInstance>;
	findAllPending(
		params: RequestInstanceFindAllPendingParamsDto,
	): Promise<PaginationRequestInstance>;
	create(body: CreateDto<RequestInstance>): Promise<RequestInstanceDetails | null>;
	update(body: EditDto<RequestInstance>): Promise<RequestInstanceDetails | null>;
	delete(requestId: string): Promise<void>;
	approve(params: BodyWithId<JustificationDto>): Promise<void>;
	reject(params: BodyWithId<JustificationDto>): Promise<void>;
	cancel(params: BodyWithId<JustificationDto>): Promise<void>;
	reason(params: BodyWithId<ReasonDto>): Promise<void>;
}

export class RequestInstanceFacade implements RequestInstanceFacadeDto {
	constructor(
		private readonly findByIdUseCase: RequestInstanceFindByIdUseCaseDto,
		private readonly filteredUseCase: RequestInstanceFilteredUseCaseDto,
		private readonly findAllByCollaboratorUseCase: RequestInstanceFindAllByCollaboratorUseCaseDto,
		private readonly findAllPendingUseCase: RequestInstanceFindAllPendingUseCaseDto,
		private readonly createUseCase: RequestInstaceCreateUseCaseDto,
		private readonly updateUseCase: RequestInstanceUpdateUseCaseDto,
		private readonly deleteUseCase: RequestInstanceDeleteUseCaseDto,
		private readonly approveUseCase: RequestInstanceApproveUseCaseDto,
		private readonly rejectUseCase: RequestInstanceRejectUseCaseDto,
		private readonly cancelUseCase: RequestInstanceCancelUseCaseDto,
		private readonly reasonUseCase: RequestInstanceReasonUseCaseDto,
	) {}
	async findAllByCollaborator(
		params: RequestInstanceFindAllByCollaboratorParamsDto,
	): Promise<PaginationRequestInstance> {
		return await this.findAllByCollaboratorUseCase.execute(params);
	}
	async findAllPending(
		params: RequestInstanceFindAllPendingParamsDto,
	): Promise<PaginationRequestInstance> {
		return await this.findAllPendingUseCase.execute(params);
	}

	async findById(collaboratorId: string): Promise<RequestInstanceDetails | null> {
		return await this.findByIdUseCase.execute(collaboratorId);
	}
	async filtered(params?: FilteredParamsDto): Promise<PaginationRequestInstance> {
		return await this.filteredUseCase.execute(params);
	}
	async create(params: CreateDto<RequestInstance>): Promise<RequestInstanceDetails | null> {
		return await this.createUseCase.execute(params);
	}
	async update(params: EditDto<RequestInstance>): Promise<RequestInstanceDetails | null> {
		return await this.updateUseCase.execute(params);
	}
	async delete(collaboratorId: string): Promise<void> {
		return await this.deleteUseCase.execute(collaboratorId);
	}
	async approve(params: BodyWithId<JustificationDto>): Promise<void> {
		return await this.approveUseCase.execute(params);
	}
	async reject(params: BodyWithId<JustificationDto>): Promise<void> {
		return await this.rejectUseCase.execute(params);
	}
	async cancel(params: BodyWithId<JustificationDto>): Promise<void> {
		return await this.cancelUseCase.execute(params);
	}
	async reason(params: BodyWithId<ReasonDto>): Promise<void> {
		return await this.reasonUseCase.execute(params);
	}
}
