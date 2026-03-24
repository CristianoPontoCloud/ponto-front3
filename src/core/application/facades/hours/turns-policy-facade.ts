import type { TurnPolicyCreatedUseCaseDto } from "@/application/usecases/hours/turn-policy/turn-policy-create";
import type { TurnPolicyDeleteUseCaseDto } from "@/application/usecases/hours/turn-policy/turn-policy-delete";
import type { TurnPolicyFindAllUseCaseDto } from "@/application/usecases/hours/turn-policy/turn-policy-find-all";
import type { TurnPolicyFindByIdUseCaseDto } from "@/application/usecases/hours/turn-policy/turn-policy-find-by-id";
import type { TurnPolicyUpdateUseCaseDto } from "@/application/usecases/hours/turn-policy/turn-policy-update";
import type {
	TurnPolicy,
	TurnPolicyCreateParams,
	TurnPolicyDeleteParams,
	TurnPolicyFindByIdParams,
	TurnPolicyUpdateParams,
} from "@/domain/entities/turns/turn-policy";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationTurnPolicy = PaginationDto<TurnPolicy[]>;
interface TurnPolicyFacadeDto {
	findAll(params: FilteredParamsDto): Promise<PaginationTurnPolicy>;
	findById(params: TurnPolicyFindByIdParams): Promise<TurnPolicy | null>;
	create(params: TurnPolicyCreateParams): Promise<TurnPolicy | null>;
	update(params: TurnPolicyUpdateParams): Promise<TurnPolicy | null>;
	delete(params: TurnPolicyDeleteParams): Promise<void>;
}

export class TurnPolicyFacade implements TurnPolicyFacadeDto {
	constructor(
		private readonly findAllUseCase: TurnPolicyFindAllUseCaseDto,
		private readonly findByIdUseCase: TurnPolicyFindByIdUseCaseDto,
		private readonly createUseCase: TurnPolicyCreatedUseCaseDto,
		private readonly updateUseCase: TurnPolicyUpdateUseCaseDto,
		private readonly deleteUseCase: TurnPolicyDeleteUseCaseDto,
	) {}
	async findAll(params: FilteredParamsDto): Promise<PaginationTurnPolicy> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(params: TurnPolicyFindByIdParams): Promise<TurnPolicy | null> {
		return await this.findByIdUseCase.execute(params);
	}
	async create(params: TurnPolicyCreateParams): Promise<TurnPolicy | null> {
		return await this.createUseCase.execute(params);
	}
	async update(params: TurnPolicyUpdateParams): Promise<TurnPolicy | null> {
		return await this.updateUseCase.execute(params);
	}
	async delete(params: TurnPolicyDeleteParams): Promise<void> {
		return await this.deleteUseCase.execute(params);
	}
}
