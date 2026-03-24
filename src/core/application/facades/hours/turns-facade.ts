import type { TurnsCreatedUseCaseDto } from "@/application/usecases/hours/turns/turns-create";
import type { TurnsDeleteUseCaseDto } from "@/application/usecases/hours/turns/turns-delete";
import type { TurnsFilteredUseCaseDto } from "@/application/usecases/hours/turns/turns-filtered";
import type { TurnsFindAllUseCaseDto } from "@/application/usecases/hours/turns/turns-find-all";
import type { TurnsFindByIdUseCaseDto } from "@/application/usecases/hours/turns/turns-find-by-id";
import type { TurnsUpdateUseCaseDto } from "@/application/usecases/hours/turns/turns-update";
import type { Turn, TurnWithCollaboratorsAndPolicy } from "@/domain/entities/turns/turns";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationTurn = PaginationDto<TurnWithCollaboratorsAndPolicy[]>;

interface TurnsFacadeDto {
	findAll(params?: FilteredParamsDto): Promise<PaginationTurn>;
	findById(turnId: string): Promise<TurnWithCollaboratorsAndPolicy | null>;
	filtered(params?: FilteredParamsDto): Promise<PaginationTurn>;
	create(body: CreateDto<Turn>): Promise<Turn | null>;
	update(body: EditDto<Turn>): Promise<Turn | null>;
	delete(turnId: string): Promise<void>;
}

export class TurnsFacade implements TurnsFacadeDto {
	constructor(
		private readonly findAllUseCase: TurnsFindAllUseCaseDto,
		private readonly findByIdUseCase: TurnsFindByIdUseCaseDto,
		private readonly filteredUseCase: TurnsFilteredUseCaseDto,
		private readonly createUseCase: TurnsCreatedUseCaseDto,
		private readonly updateUseCase: TurnsUpdateUseCaseDto,
		private readonly deleteUseCase: TurnsDeleteUseCaseDto,
	) {}
	async findAll(params?: FilteredParamsDto): Promise<PaginationTurn> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(turnId: string): Promise<TurnWithCollaboratorsAndPolicy | null> {
		return await this.findByIdUseCase.execute(turnId);
	}
	async filtered(params?: FilteredParamsDto): Promise<PaginationTurn> {
		return await this.filteredUseCase.execute(params);
	}
	async create(body: CreateDto<Turn>): Promise<Turn | null> {
		return await this.createUseCase.execute(body);
	}
	async update(body: EditDto<Turn>): Promise<Turn | null> {
		return await this.updateUseCase.execute(body);
	}
	async delete(turnId: string): Promise<void> {
		return await this.deleteUseCase.execute(turnId);
	}
}
