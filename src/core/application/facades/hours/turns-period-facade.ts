import type { TurnPeriodCreatedUseCaseDto } from "@/application/usecases/hours/turn-period/turn-period-create";
import type { TurnPeriodDeleteUseCaseDto } from "@/application/usecases/hours/turn-period/turn-period-delete";
import type { TurnPeriodFindAllUseCaseDto } from "@/application/usecases/hours/turn-period/turn-period-find-all";
import type { TurnPeriodFindByIdUseCaseDto } from "@/application/usecases/hours/turn-period/turn-period-find-by-id";
import type { TurnPeriodUpdateUseCaseDto } from "@/application/usecases/hours/turn-period/turn-period-update";
import type {
	TurnPeriod,
	TurnPeriodCreateParams,
	TurnPeriodDeleteParams,
	TurnPeriodFindByIdParams,
	TurnPeriodUpdateParams,
} from "@/domain/entities/turns/turn-period";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationTurnPeriod = PaginationDto<TurnPeriod[]>;
interface TurnPeriodFacadeDto {
	findAll(params: FilteredParamsDto): Promise<PaginationTurnPeriod>;
	findById(params: TurnPeriodFindByIdParams): Promise<TurnPeriod | null>;
	create(params: TurnPeriodCreateParams): Promise<TurnPeriod | null>;
	update(params: TurnPeriodUpdateParams): Promise<TurnPeriod | null>;
	delete(params: TurnPeriodDeleteParams): Promise<void>;
}

export class TurnPeriodFacade implements TurnPeriodFacadeDto {
	constructor(
		private readonly findAllUseCase: TurnPeriodFindAllUseCaseDto,
		private readonly findByIdUseCase: TurnPeriodFindByIdUseCaseDto,
		private readonly createUseCase: TurnPeriodCreatedUseCaseDto,
		private readonly updateUseCase: TurnPeriodUpdateUseCaseDto,
		private readonly deleteUseCase: TurnPeriodDeleteUseCaseDto,
	) {}
	async findAll(params: FilteredParamsDto): Promise<PaginationTurnPeriod> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(params: TurnPeriodFindByIdParams): Promise<TurnPeriod | null> {
		return await this.findByIdUseCase.execute(params);
	}
	async create(params: TurnPeriodCreateParams): Promise<TurnPeriod | null> {
		return await this.createUseCase.execute(params);
	}
	async update(params: TurnPeriodUpdateParams): Promise<TurnPeriod | null> {
		return await this.updateUseCase.execute(params);
	}
	async delete(params: TurnPeriodDeleteParams): Promise<void> {
		return await this.deleteUseCase.execute(params);
	}
}
