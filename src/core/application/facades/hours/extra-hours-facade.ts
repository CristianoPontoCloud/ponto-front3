import type { ExtraHoursCreatedUseCaseDto } from "@/application/usecases/hours/extra-hours/extra-hours-create";
import type { ExtraHoursDeleteUseCaseDto } from "@/application/usecases/hours/extra-hours/extra-hours-delete";
import type { ExtraHoursFilteredUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-filtered";
import type { ExtraHoursFindAllUseCaseDto } from "@/application/usecases/hours/extra-hours/extra-hours-find-all";
import type { ExtraHoursFindByIdUseCaseDto } from "@/application/usecases/hours/extra-hours/extra-hours-find-by-id";
import type { ExtraHoursUpdateUseCaseDto } from "@/application/usecases/hours/extra-hours/extra-hours-update";
import type {
	ExtraHour,
	ExtraHourDetails,
	ExtraHourFormProps
} from "@/domain/entities/extra-hour/extra-hour";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationExtraHour = PaginationDto<ExtraHour[]>;

interface ExtraHoursFacadeDto {
	findAll(params?: FilteredParamsDto): Promise<PaginationExtraHour>;
	findById(extrahourId: string): Promise<ExtraHourDetails | null>;
	filtered(params?: FilteredParamsDto): Promise<PaginationExtraHour>;
	create(body: CreateDto<ExtraHour>): Promise<ExtraHourDetails | null>;
	update(body: EditDto<ExtraHour>): Promise<ExtraHourDetails | null>;
	delete(extrahourId: string): Promise<void>;
}

export class ExtraHoursFacade implements ExtraHoursFacadeDto {
	constructor(
		private readonly findAllUseCase: ExtraHoursFindAllUseCaseDto,
		private readonly findByIdUseCase: ExtraHoursFindByIdUseCaseDto,
		private readonly filteredUseCase: ExtraHoursFilteredUseCase,
		private readonly createUseCase: ExtraHoursCreatedUseCaseDto,
		private readonly updateUseCase: ExtraHoursUpdateUseCaseDto,
		private readonly deleteUseCase: ExtraHoursDeleteUseCaseDto,
	) { }
	async findAll(params?: FilteredParamsDto): Promise<PaginationExtraHour> {
		return await this.findAllUseCase.execute(params);
	}
	async findById(extrahourId: string): Promise<ExtraHourDetails | null> {
		return await this.findByIdUseCase.execute(extrahourId);
	}
	async filtered(params?: FilteredParamsDto): Promise<PaginationExtraHour> {
		return await this.filteredUseCase.execute(params);
	}
	async create(body: CreateDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null> {
		return await this.createUseCase.execute(body);
	}
	async update(body: EditDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null> {
		return await this.updateUseCase.execute(body);
	}
	async delete(extrahourId: string): Promise<void> {
		return await this.deleteUseCase.execute(extrahourId);
	}
}
