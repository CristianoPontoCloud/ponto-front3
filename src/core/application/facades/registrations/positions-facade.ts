import type { PositionsCreatedUseCaseDto } from "@/application/usecases/registrations/positions/positions-create";
import type { PositionsDeleteUseCaseDto } from "@/application/usecases/registrations/positions/positions-delete";
import type { PositionsFilteredUseCase } from "@/application/usecases/registrations/positions/positions-filtered";
import type { PositionsFindAllPreBuiltUseCase } from "@/application/usecases/registrations/positions/positions-find-all-pre-built";
import type { PositionsUpdateUseCaseDto } from "@/application/usecases/registrations/positions/positions-update";
import type { Position, PositionDetails, PositionFormProps } from "@/domain/entities/positions";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { PositionsFindAllUseCase } from "../../usecases/registrations/positions/positions-find-all";
import type { PositionsFindByIdUseCaseDto } from "../../usecases/registrations/positions/positions-find-by-id";

type PaginationPosition = PaginationDto<Position[]>

interface PositionsFacadeDto {
  findAll(): Promise<PaginationPosition>
  findAllPreBuilt(): Promise<PaginationPosition>
  findById(positionId: string): Promise<PositionDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationPosition>
  create(body: CreateDto<PositionFormProps>): Promise<PositionDetails | null>
  update(body: EditDto<PositionFormProps>): Promise<PositionDetails | null>
  delete(positionId: string): Promise<void>
}

export class PositionsFacade implements PositionsFacadeDto {
  constructor(
    private readonly findAllUseCase: PositionsFindAllUseCase,
    private readonly findAllPreBuiltUseCase: PositionsFindAllPreBuiltUseCase,
    private readonly findByIdUseCase: PositionsFindByIdUseCaseDto,
    private readonly filteredUseCase: PositionsFilteredUseCase,
    private readonly createUseCase: PositionsCreatedUseCaseDto,
    private readonly updateUseCase: PositionsUpdateUseCaseDto,
    private readonly deleteUseCase: PositionsDeleteUseCaseDto,
  ) { }
  async findAll(): Promise<PaginationPosition> {
    return await this.findAllUseCase.execute()
  }
  async findAllPreBuilt(): Promise<PaginationPosition> {
    return await this.findAllPreBuiltUseCase.execute()
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationPosition> {
    return await this.filteredUseCase.execute(params)
  }
  async findById(positionId: string): Promise<PositionDetails | null> {
    return await this.findByIdUseCase.execute(positionId)
  }
  async create(body: CreateDto<PositionFormProps>): Promise<PositionDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<PositionFormProps>): Promise<PositionDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(positionId: string): Promise<void> {
    return await this.deleteUseCase.execute(positionId)
  }
}
