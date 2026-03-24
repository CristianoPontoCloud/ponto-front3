import type { ExtraHoursRulesCreatedUseCaseDto } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-create";
import type { ExtraHoursRulesDeleteUseCaseDto } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-delete";
import type { ExtraHoursRulesFilteredUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-filtered";
import type { ExtraHoursRulesFindAllUseCaseDto } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-find-all";
import type { ExtraHoursRulesFindByIdUseCaseDto } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-find-by-id";
import type { ExtraHoursRulesUpdateUseCaseDto } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-update";
import type {
	ExtraHourRules,
	ExtraHourRulesFilteredParamsDto,
	ExtraHourRulesNumberMultiplier,
} from "@/domain/entities/extra-hour/extra-hour-rules";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationExtraHourRules = PaginationDto<ExtraHourRules[]>;

interface ExtraHoursRulesFacadeDto {
	findAll(params?: ExtraHourRulesFilteredParamsDto): Promise<PaginationExtraHourRules>;
	findById(extrahourId: string): Promise<ExtraHourRules | null>;
	filtered(params?: ExtraHourRulesFilteredParamsDto): Promise<PaginationExtraHourRules>;
	create(body: CreateDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null>;
	update(body: EditDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null>;
	delete(extrahourId: string): Promise<void>;
}

export class ExtraHoursRulesFacade implements ExtraHoursRulesFacadeDto {
	constructor(
		private readonly findAllUseCase: ExtraHoursRulesFindAllUseCaseDto,
		private readonly findByIdUseCase: ExtraHoursRulesFindByIdUseCaseDto,
		private readonly filteredUseCase: ExtraHoursRulesFilteredUseCase,
		private readonly createUseCase: ExtraHoursRulesCreatedUseCaseDto,
		private readonly updateUseCase: ExtraHoursRulesUpdateUseCaseDto,
		private readonly deleteUseCase: ExtraHoursRulesDeleteUseCaseDto,
	) { }
	async findAll(params?: ExtraHourRulesFilteredParamsDto): Promise<PaginationExtraHourRules> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(extrahourId: string): Promise<ExtraHourRules | null> {
		return await this.findByIdUseCase.execute(extrahourId);
	}
	async filtered(params?: ExtraHourRulesFilteredParamsDto): Promise<PaginationExtraHourRules> {
		return await this.filteredUseCase.execute(params);
	}
	async create(body: CreateDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null> {
		return await this.createUseCase.execute(body);
	}
	async update(body: EditDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null> {
		return await this.updateUseCase.execute(body);
	}
	async delete(extrahourId: string): Promise<void> {
		return await this.deleteUseCase.execute(extrahourId);
	}
}
