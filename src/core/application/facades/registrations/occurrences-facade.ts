import type { OccurrencesCreatedUseCaseDto } from "@/application/usecases/registrations/occurrences/occurrences-create";
import type { OccurrencesDeleteUseCaseDto } from "@/application/usecases/registrations/occurrences/occurrences-delete";
import type { OccurrencesFilteredUseCase } from "@/application/usecases/registrations/occurrences/occurrences-filtered";
import type { OccurrencesUpdateUseCaseDto } from "@/application/usecases/registrations/occurrences/occurrences-update";
import type { Occurrence, OccurrenceDetails, OccurrenceFormProps } from "@/domain/entities/occurrence";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { OccurrencesFindAllUseCase } from "../../usecases/registrations/occurrences/occurrences-find-all";
import type { OccurrencesFindByIdUseCaseDto } from "../../usecases/registrations/occurrences/occurrences-find-by-id";

type PaginationOccurrence = PaginationDto<Occurrence[]>

interface OccurrencesFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationOccurrence>
  findById(occurrenceId: string): Promise<OccurrenceDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationOccurrence>
  create(body: CreateDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null>
  update(body: EditDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null>
  delete(occurrenceId: string): Promise<void>
}

export class OccurrencesFacade implements OccurrencesFacadeDto {
  constructor(
    private readonly findAllUseCase: OccurrencesFindAllUseCase,
    private readonly findByIdUseCase: OccurrencesFindByIdUseCaseDto,
    private readonly filteredUseCase: OccurrencesFilteredUseCase,
    private readonly createUseCase: OccurrencesCreatedUseCaseDto,
    private readonly updateUseCase: OccurrencesUpdateUseCaseDto,
    private readonly deleteUseCase: OccurrencesDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationOccurrence> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(occurrenceId: string): Promise<OccurrenceDetails | null> {
    return await this.findByIdUseCase.execute(occurrenceId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationOccurrence> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(occurrenceId: string): Promise<void> {
    return await this.deleteUseCase.execute(occurrenceId)
  }
}
