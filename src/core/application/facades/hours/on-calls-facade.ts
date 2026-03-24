import type { OnCallsCreatedUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-create"
import type { OnCallsDeleteUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-delete"
import type { OnCallsFilteredUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-filtered"
import type { OnCallsFindAllUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-find-all"
import type { OnCallsFindByIdUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-find-by-id"
import type { OnCallsUpdateUseCaseDto } from "@/application/usecases/hours/on-calls/on-calls-update"
import type { OnCall, OnCallDetails, OnCallFormProps } from "@/domain/entities/on-call"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationOnCall = PaginationDto<OnCall[]>

interface OnCallsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationOnCall>
  findById(oncallId: string): Promise<OnCallDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationOnCall>
  create(body: CreateDto<OnCallFormProps>): Promise<OnCallDetails | null>
  update(body: EditDto<OnCallFormProps>): Promise<OnCallDetails | null>
  delete(oncallId: string): Promise<void>
}

export class OnCallsFacade implements OnCallsFacadeDto {
  constructor(
    private readonly findAllUseCase: OnCallsFindAllUseCaseDto,
    private readonly findByIdUseCase: OnCallsFindByIdUseCaseDto,
    private readonly filteredUseCase: OnCallsFilteredUseCaseDto,
    private readonly createUseCase: OnCallsCreatedUseCaseDto,
    private readonly updateUseCase: OnCallsUpdateUseCaseDto,
    private readonly deleteUseCase: OnCallsDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationOnCall> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(oncallId: string): Promise<OnCallDetails | null> {
    return await this.findByIdUseCase.execute(oncallId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationOnCall> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<OnCallFormProps>): Promise<OnCallDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<OnCallFormProps>): Promise<OnCallDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(oncallId: string): Promise<void> {
    return await this.deleteUseCase.execute(oncallId)
  }
}
