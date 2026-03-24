import type { TurnDayCreatedUseCaseDto } from "@/application/usecases/hours/turn-day/turn-day-create";
import type { TurnDayDeleteUseCaseDto } from "@/application/usecases/hours/turn-day/turn-day-delete";
import type { TurnDayFindAllUseCaseDto } from "@/application/usecases/hours/turn-day/turn-day-find-all";
import type { TurnDayFindByIdUseCaseDto } from "@/application/usecases/hours/turn-day/turn-day-find-by-id";
import type { TurnDayUpdateUseCaseDto } from "@/application/usecases/hours/turn-day/turn-day-update";
import type {
	TurnDay,
	TurnDayCreateParams,
	TurnDayDeleteParams,
	TurnDayFindByIdParams,
	TurnDayUpdateParams,
} from "@/domain/entities/turns/turn-day";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationTurnDay = PaginationDto<TurnDay[]>;
interface TurnDayFacadeDto {
	findAll(params: FilteredParamsDto): Promise<PaginationTurnDay>;
	findById(params: TurnDayFindByIdParams): Promise<TurnDay | null>;
	create(params: TurnDayCreateParams): Promise<TurnDay | null>;
	update(params: TurnDayUpdateParams): Promise<TurnDay | null>;
	delete(params: TurnDayDeleteParams): Promise<void>;
}

export class TurnDayFacade implements TurnDayFacadeDto {
	constructor(
		private readonly findAllUseCase: TurnDayFindAllUseCaseDto,
		private readonly findByIdUseCase: TurnDayFindByIdUseCaseDto,
		private readonly createUseCase: TurnDayCreatedUseCaseDto,
		private readonly updateUseCase: TurnDayUpdateUseCaseDto,
		private readonly deleteUseCase: TurnDayDeleteUseCaseDto,
	) {}
	async findAll(params: FilteredParamsDto): Promise<PaginationTurnDay> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(params: TurnDayFindByIdParams): Promise<TurnDay | null> {
		return await this.findByIdUseCase.execute(params);
	}
	async create(params: TurnDayCreateParams): Promise<TurnDay | null> {
		return await this.createUseCase.execute(params);
	}
	async update(params: TurnDayUpdateParams): Promise<TurnDay | null> {
		return await this.updateUseCase.execute(params);
	}
	async delete(params: TurnDayDeleteParams): Promise<void> {
		return await this.deleteUseCase.execute(params);
	}
}
