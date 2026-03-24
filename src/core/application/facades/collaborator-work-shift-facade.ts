import type {
	CollaboratorWorkShift,
	CollaboratorWorkShiftFindAllParams,
} from "@/domain/entities/collaborator/collaborator-work-shift";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorWorkShiftFindByIdUseCaseDto } from "../usecases/collaborators-work-shift/collaborator-find-by-id";
import type {
	CollaboratorWorkShiftCreateUseCaseParams,
	CollaboratorWorkShiftCreatedUseCaseDto,
} from "../usecases/collaborators-work-shift/collaborators-create";
import type { CollaboratorWorkShiftDeleteUseCaseDto } from "../usecases/collaborators-work-shift/collaborators-delete";
import type { CollaboratorWorkShiftFindAllUseCaseDto } from "../usecases/collaborators-work-shift/collaborators-find-all";
import type {
	CollaboratorWorkShiftUpdateUseCaseDto,
	CollaboratorWorkShiftUpdateUseCaseParams,
} from "../usecases/collaborators-work-shift/collaborators-update";

type PaginationCollaboratorWorkShift = PaginationDto<CollaboratorWorkShift[]>;

interface CollaboratorWorkShiftFacadeDto {
	findAll(params?: CollaboratorWorkShiftFindAllParams): Promise<PaginationCollaboratorWorkShift>;
	findById(collaboratorWorkShiftId: string): Promise<CollaboratorWorkShift | null>;
	create(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null>;
	temporaryOverride(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null>;
	update(
		body: EditDto<CollaboratorWorkShiftUpdateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null>;
	delete(collaboratorWorkShiftId: string): Promise<void>;
}

export class CollaboratorWorkShiftFacade implements CollaboratorWorkShiftFacadeDto {
	constructor(
		private readonly findAllUseCase: CollaboratorWorkShiftFindAllUseCaseDto,
		private readonly findByIdUseCase: CollaboratorWorkShiftFindByIdUseCaseDto,
		private readonly createUseCase: CollaboratorWorkShiftCreatedUseCaseDto,
		private readonly temporaryOverrideUseCase: CollaboratorWorkShiftCreatedUseCaseDto,
		private readonly updateUseCase: CollaboratorWorkShiftUpdateUseCaseDto,
		private readonly deleteUseCase: CollaboratorWorkShiftDeleteUseCaseDto,
	) { }

	async findAll(
		params?: CollaboratorWorkShiftFindAllParams,
	): Promise<PaginationCollaboratorWorkShift> {
		return await this.findAllUseCase.execute(params);
	}

	async findById(collaboratorWorkShiftId: string): Promise<CollaboratorWorkShift | null> {
		return await this.findByIdUseCase.execute(collaboratorWorkShiftId);
	}

	async create(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null> {
		return await this.createUseCase.execute(body);
	}

	async temporaryOverride(
		body: CreateDto<CollaboratorWorkShiftCreateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null> {
		return await this.temporaryOverrideUseCase.execute(body);
	}

	async update(
		body: EditDto<CollaboratorWorkShiftUpdateUseCaseParams>,
	): Promise<CollaboratorWorkShift | null> {
		return await this.updateUseCase.execute(body);
	}

	async delete(collaboratorWorkShiftId: string): Promise<void> {
		return await this.deleteUseCase.execute(collaboratorWorkShiftId);
	}
}
