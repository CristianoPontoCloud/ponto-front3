import type {
	CollaboratorExtraTime,
	CollaboratorExtraTimeFindAllParams,
	CollaboratorExtraTimeUpdateParams,
} from "@/domain/entities/collaborator/collaborator-extra-time";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorExtraTimeFindByIdUseCaseDto } from "../usecases/collaborators-extra-time/collaborator-find-by-id";
import type {
	CollaboratorExtraTimeCreateUseCaseParams,
	CollaboratorExtraTimeCreatedUseCaseDto,
} from "../usecases/collaborators-extra-time/collaborators-create";
import type { CollaboratorExtraTimeDeleteUseCaseDto } from "../usecases/collaborators-extra-time/collaborators-delete";
import type { CollaboratorExtraTimeFindAllUseCaseDto } from "../usecases/collaborators-extra-time/collaborators-find-all";
import type {
	CollaboratorExtraTimeUpdateUseCaseDto,
	CollaboratorExtraTimeUpdateUseCaseParams,
} from "../usecases/collaborators-extra-time/collaborators-update";

type PaginationCollaboratorExtraTime = PaginationDto<CollaboratorExtraTime[]>;

interface CollaboratorExtraTimeFacadeDto {
	findAll(params?: CollaboratorExtraTimeFindAllParams): Promise<PaginationCollaboratorExtraTime>;
	findById(collaboratorWorkShiftId: string): Promise<CollaboratorExtraTime | null>;
	create(
		body: CreateDto<CollaboratorExtraTimeCreateUseCaseParams>,
	): Promise<CollaboratorExtraTime | null>;
	update(body: EditDto<CollaboratorExtraTimeUpdateParams>): Promise<CollaboratorExtraTime | null>;
	delete(collaboratorWorkShiftId: string): Promise<void>;
}

export class CollaboratorExtraTimeFacade implements CollaboratorExtraTimeFacadeDto {
	constructor(
		private readonly findAllUseCase: CollaboratorExtraTimeFindAllUseCaseDto,
		private readonly findByIdUseCase: CollaboratorExtraTimeFindByIdUseCaseDto,
		private readonly createUseCase: CollaboratorExtraTimeCreatedUseCaseDto,
		private readonly updateUseCase: CollaboratorExtraTimeUpdateUseCaseDto,
		private readonly deleteUseCase: CollaboratorExtraTimeDeleteUseCaseDto,
	) {}

	async findAll(
		params?: CollaboratorExtraTimeFindAllParams,
	): Promise<PaginationCollaboratorExtraTime> {
		return await this.findAllUseCase.execute(params);
	}

	async findById(collaboratorWorkShiftId: string): Promise<CollaboratorExtraTime | null> {
		return await this.findByIdUseCase.execute(collaboratorWorkShiftId);
	}

	async create(
		body: CreateDto<CollaboratorExtraTimeCreateUseCaseParams>,
	): Promise<CollaboratorExtraTime | null> {
		return await this.createUseCase.execute(body);
	}

	async update(
		body: EditDto<CollaboratorExtraTimeUpdateUseCaseParams>,
	): Promise<CollaboratorExtraTime | null> {
		return await this.updateUseCase.execute(body);
	}

	async delete(collaboratorWorkShiftId: string): Promise<void> {
		return await this.deleteUseCase.execute(collaboratorWorkShiftId);
	}
}
