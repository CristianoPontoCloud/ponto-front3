import type { HourBankEntryCreatedUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-create"
import type { HourBankEntryCreatedBulkUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-create-bulk"
import type { HourBankEntryDeleteUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-delete"
import type { HourBankEntryFilteredUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-filtered"
import type { HourBankEntryFindAllUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-find-all"
import type { HourBankEntryFindByIdUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-find-by-id"
import type { HourBankEntryUpdateUseCaseDto } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-update"
import type { MarkHourBankEntryBulkFormProps, MarkHourBankEntryDetails, MarkHourBankEntryFormProps } from "@/domain/entities/marks/settings/mark-hour-bank"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationHourBankEntry = PaginationDto<MarkHourBankEntryDetails[]>
type CreateHourBankEntry = CreateDto<MarkHourBankEntryFormProps>
type UpdateHourBankEntry = EditDto<MarkHourBankEntryFormProps>


interface HourBankEntryFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationHourBankEntry>
  findById(hourbankId: string): Promise<MarkHourBankEntryDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationHourBankEntry>
  create(body: CreateHourBankEntry): Promise<MarkHourBankEntryDetails | null>
  createBulk(body: MarkHourBankEntryBulkFormProps): Promise<MarkHourBankEntryDetails[] | null>
  update(body: UpdateHourBankEntry): Promise<MarkHourBankEntryDetails | null>
  delete(hourBankEntryId: string): Promise<void>
}

export class HourBankEntryFacade implements HourBankEntryFacadeDto {
  constructor(
    private readonly findAllUseCase: HourBankEntryFindAllUseCaseDto,
    private readonly findByIdUseCase: HourBankEntryFindByIdUseCaseDto,
    private readonly filteredUseCase: HourBankEntryFilteredUseCaseDto,
    private readonly createUseCase: HourBankEntryCreatedUseCaseDto,
    private readonly createBulkUseCase: HourBankEntryCreatedBulkUseCaseDto,
    private readonly updateUseCase: HourBankEntryUpdateUseCaseDto,
    private readonly deleteUseCase: HourBankEntryDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationHourBankEntry> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(hourbankId: string): Promise<MarkHourBankEntryDetails | null> {
    return await this.findByIdUseCase.execute(hourbankId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationHourBankEntry> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateHourBankEntry): Promise<MarkHourBankEntryDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async createBulk(body: MarkHourBankEntryBulkFormProps): Promise<MarkHourBankEntryDetails[] | null> {
    return await this.createBulkUseCase.execute(body)
  }
  async update(body: UpdateHourBankEntry): Promise<MarkHourBankEntryDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(hourBankEntryId: string): Promise<void> {
    return await this.deleteUseCase.execute(hourBankEntryId)
  }
}
