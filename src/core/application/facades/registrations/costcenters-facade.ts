import type { CostCentersCreatedUseCaseDto } from "@/application/usecases/registrations/costcenters/costcenters-create"
import type { CostCentersDeleteUseCaseDto } from "@/application/usecases/registrations/costcenters/costcenters-delete"
import type { CostCentersFilteredUseCase } from "@/application/usecases/registrations/costcenters/costcenters-filtered"
import type { CostCentersFindAllUseCaseDto } from "@/application/usecases/registrations/costcenters/costcenters-find-all"
import type { CostCentersFindByIdUseCaseDto } from "@/application/usecases/registrations/costcenters/costcenters-find-by-id"
import type { CostCentersUpdateUseCaseDto } from "@/application/usecases/registrations/costcenters/costcenters-update"
import type { CostCenter, CostCenterDetails, CostCenterFormProps } from "@/domain/entities/center-cost"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationCostCenter = PaginationDto<CostCenter[]>

interface CostCentersFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationCostCenter>
  findById(costcenterId: string): Promise<CostCenterDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationCostCenter>
  create(body: CreateDto<CostCenterFormProps>): Promise<CostCenterDetails | null>
  update(body: EditDto<CostCenterFormProps>): Promise<CostCenterDetails | null>
  delete(costcenterId: string): Promise<void>
}

export class CostCentersFacade implements CostCentersFacadeDto {
  constructor(
    private readonly findAllUseCase: CostCentersFindAllUseCaseDto,
    private readonly findByIdUseCase: CostCentersFindByIdUseCaseDto,
    private readonly filteredUseCase: CostCentersFilteredUseCase,
    private readonly createUseCase: CostCentersCreatedUseCaseDto,
    private readonly updateUseCase: CostCentersUpdateUseCaseDto,
    private readonly deleteUseCase: CostCentersDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationCostCenter> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(costcenterId: string): Promise<CostCenterDetails | null> {
    return await this.findByIdUseCase.execute(costcenterId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationCostCenter> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<CostCenterFormProps>): Promise<CostCenterDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<CostCenterFormProps>): Promise<CostCenterDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(costcenterId: string): Promise<void> {
    return await this.deleteUseCase.execute(costcenterId)
  }
}
