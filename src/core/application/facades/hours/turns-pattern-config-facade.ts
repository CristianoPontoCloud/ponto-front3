import type { TurnPatternConfigCreatedUseCaseDto } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-create";
import type { TurnPatternConfigDeleteUseCaseDto } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-delete";
import type { TurnPatternConfigFindAllUseCaseDto } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-find-all";
import type { TurnPatternConfigFindByIdUseCaseDto } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-find-by-id";
import type { TurnPatternConfigUpdateUseCaseDto } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-update";
import type {
	TurnPatternConfig,
	TurnPatternConfigCreateParams,
	TurnPatternConfigDeleteParams,
	TurnPatternConfigFindByIdParams,
	TurnPatternConfigUpdateParams,
} from "@/domain/entities/turns/turn-pattern-config";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationTurnPatternConfig = PaginationDto<TurnPatternConfig[]>;
interface TurnPatternConfigFacadeDto {
	findAll(params: FilteredParamsDto): Promise<PaginationTurnPatternConfig>;
	findById(params: TurnPatternConfigFindByIdParams): Promise<TurnPatternConfig | null>;
	create(params: TurnPatternConfigCreateParams): Promise<TurnPatternConfig | null>;
	update(params: TurnPatternConfigUpdateParams): Promise<TurnPatternConfig | null>;
	delete(params: TurnPatternConfigDeleteParams): Promise<void>;
}

export class TurnPatternConfigFacade implements TurnPatternConfigFacadeDto {
	constructor(
		private readonly findAllUseCase: TurnPatternConfigFindAllUseCaseDto,
		private readonly findByIdUseCase: TurnPatternConfigFindByIdUseCaseDto,
		private readonly createUseCase: TurnPatternConfigCreatedUseCaseDto,
		private readonly updateUseCase: TurnPatternConfigUpdateUseCaseDto,
		private readonly deleteUseCase: TurnPatternConfigDeleteUseCaseDto,
	) {}
	async findAll(params: FilteredParamsDto): Promise<PaginationTurnPatternConfig> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(params: TurnPatternConfigFindByIdParams): Promise<TurnPatternConfig | null> {
		return await this.findByIdUseCase.execute(params);
	}
	async create(params: TurnPatternConfigCreateParams): Promise<TurnPatternConfig | null> {
		return await this.createUseCase.execute(params);
	}
	async update(params: TurnPatternConfigUpdateParams): Promise<TurnPatternConfig | null> {
		return await this.updateUseCase.execute(params);
	}
	async delete(params: TurnPatternConfigDeleteParams): Promise<void> {
		return await this.deleteUseCase.execute(params);
	}
}
