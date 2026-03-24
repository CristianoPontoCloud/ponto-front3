import type { DismissalsCreatedUseCaseDto } from "@/application/usecases/registrations/dismissals/dismissals-create"
import type { DismissalsDeleteUseCaseDto } from "@/application/usecases/registrations/dismissals/dismissals-delete"
import type { DismissalsFilteredUseCase } from "@/application/usecases/registrations/dismissals/dismissals-filtered"
import type { DismissalsFindAllUseCase } from "@/application/usecases/registrations/dismissals/dismissals-find-all"
import type { DismissalsFindByIdUseCaseDto } from "@/application/usecases/registrations/dismissals/dismissals-find-by-id"
import type { DismissalsUpdateUseCaseDto } from "@/application/usecases/registrations/dismissals/dismissals-update"
import type { Dismissal, DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationDismissal = PaginationDto<Dismissal[]>


interface DismissalsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationDismissal>
  findById(equipmentId: string): Promise<DismissalDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationDismissal>
  create(body: CreateDto<DismissalFormProps>): Promise<DismissalDetails | null>
  update(body: EditDto<DismissalFormProps>): Promise<DismissalDetails | null>
  delete(equipmentId: string): Promise<void>
}

export class DismissalsFacade implements DismissalsFacadeDto {
  constructor(
    private readonly findAllUseCase: DismissalsFindAllUseCase,
    private readonly findByIdUseCase: DismissalsFindByIdUseCaseDto,
    private readonly filteredUseCase: DismissalsFilteredUseCase,
    private readonly createUseCase: DismissalsCreatedUseCaseDto,
    private readonly updateUseCase: DismissalsUpdateUseCaseDto,
    private readonly deleteUseCase: DismissalsDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationDismissal> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(equipmentId: string): Promise<DismissalDetails | null> {
    return await this.findByIdUseCase.execute(equipmentId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationDismissal> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<DismissalFormProps>): Promise<DismissalDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<DismissalFormProps>): Promise<DismissalDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(equipmentId: string): Promise<void> {
    return await this.deleteUseCase.execute(equipmentId)
  }
}
