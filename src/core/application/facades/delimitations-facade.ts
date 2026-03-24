import type { GeoFence } from "@/domain/entities/delimitation"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { DelimitationsCreatedUseCase } from "../usecases/delimitations/delimitation-create"
import type { DelimitationsDeleteUseCase } from "../usecases/delimitations/delimitation-delete"
import type { DelimitationsFindAllByCompanyIdUseCaseDto } from "../usecases/delimitations/delimitation-find-all-by-company-id"
import type { DelimitationsFindByIdUseCase } from "../usecases/delimitations/delimitation-find-by-id"
import type { DelimitationsUpdateUseCase } from "../usecases/delimitations/delimitation-update"


type PaginationDelimitation = PaginationDto<GeoFence[]>

interface DelimitationsFacadeDto {
  findAllByCompanyId(): Promise<PaginationDelimitation>
  create(body: CreateDto<GeoFence>): Promise<GeoFence | null>
  update(body: EditDto<GeoFence>): Promise<GeoFence | null>
  findById(geofenceId: string): Promise<GeoFence | null>
  delete(geofenceId: string): Promise<void>
}

export class DelimitationsFacade implements DelimitationsFacadeDto {
  constructor(
    private readonly createCompanyIdUseCase: DelimitationsCreatedUseCase,
    private readonly updateCompanyIdUseCase: DelimitationsUpdateUseCase,
    private readonly findAllByCompanyIdUseCase: DelimitationsFindAllByCompanyIdUseCaseDto,
    private readonly findByIdUseCase: DelimitationsFindByIdUseCase,
    private readonly deleteUseCase: DelimitationsDeleteUseCase,
  ) { }
  async create(body: CreateDto<GeoFence>): Promise<GeoFence | null> {
    return await this.createCompanyIdUseCase.execute(body)
  }
  async update(body: EditDto<Partial<GeoFence>>): Promise<GeoFence | null> {
    return await this.updateCompanyIdUseCase.execute(body)
  }
  async findAllByCompanyId(): Promise<PaginationDelimitation> {
    return await this.findAllByCompanyIdUseCase.execute()
  }
  async findById(geofenceId: string): Promise<GeoFence | null> {
    return await this.findByIdUseCase.execute(geofenceId)
  }
  async delete(geofenceId: string): Promise<void> {
    return await this.deleteUseCase.execute(geofenceId)
  }
}

