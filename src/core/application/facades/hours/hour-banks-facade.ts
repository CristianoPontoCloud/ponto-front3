import type { HourBanksCreatedUseCaseDto } from "@/application/usecases/hours/hour-banks/hour-banks-create"
import type { HourBanksDeleteUseCaseDto } from "@/application/usecases/hours/hour-banks/hour-banks-delete"
import type { HourBanksFilteredUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-filtered"
import type { HourBanksFindAllUseCaseDto } from "@/application/usecases/hours/hour-banks/hour-banks-find-all"
import type { HourBanksFindByIdUseCaseDto } from "@/application/usecases/hours/hour-banks/hour-banks-find-by-id"
import type { HourBanksUpdateUseCaseDto } from "@/application/usecases/hours/hour-banks/hour-banks-update"
import type { HourBank, HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationHourBank = PaginationDto<HourBank[]>

interface HourBanksFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationHourBank>
  findById(hourbankId: string): Promise<HourBankDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationHourBank>
  create(body: CreateDto<HourBankFormProps>): Promise<HourBankDetails | null>
  update(body: EditDto<HourBankFormProps>): Promise<HourBankDetails | null>
  delete(hourbankId: string): Promise<void>
}

export class HourBanksFacade implements HourBanksFacadeDto {
  constructor(
    private readonly findAllUseCase: HourBanksFindAllUseCaseDto,
    private readonly findByIdUseCase: HourBanksFindByIdUseCaseDto,
    private readonly filteredUseCase: HourBanksFilteredUseCase,
    private readonly createUseCase: HourBanksCreatedUseCaseDto,
    private readonly updateUseCase: HourBanksUpdateUseCaseDto,
    private readonly deleteUseCase: HourBanksDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationHourBank> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(hourbankId: string): Promise<HourBankDetails | null> {
    return await this.findByIdUseCase.execute(hourbankId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationHourBank> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<HourBankFormProps>): Promise<HourBankDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<HourBankFormProps>): Promise<HourBankDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(hourbankId: string): Promise<void> {
    return await this.deleteUseCase.execute(hourbankId)
  }
}
