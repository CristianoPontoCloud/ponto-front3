import type { RequestsCreatedUseCaseDto } from "@/application/usecases/registrations/requests/requests-create";
import type { RequestsDeleteUseCaseDto } from "@/application/usecases/registrations/requests/requests-delete";
import type { RequestsFilteredUseCase } from "@/application/usecases/registrations/requests/requests-filtered";
import type { RequestsUpdateUseCaseDto } from "@/application/usecases/registrations/requests/requests-update";
import type { Request, RequestDetails, RequestFormProps } from "@/domain/entities/request";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { RequestsFindAllUseCase } from "../../usecases/registrations/requests/requests-find-all";
import type { RequestsFindByIdUseCaseDto } from "../../usecases/registrations/requests/requests-find-by-id";

type PaginationRequest = PaginationDto<Request[]>

interface RequestsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationRequest>
  findById(requestId: string): Promise<RequestDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationRequest>
  create(body: CreateDto<RequestFormProps>): Promise<RequestDetails | null>
  update(body: EditDto<RequestFormProps>): Promise<RequestDetails | null>
  delete(requestId: string): Promise<void>
}

export class RequestsFacade implements RequestsFacadeDto {
  constructor(
    private readonly findAllUseCase: RequestsFindAllUseCase,
    private readonly findByIdUseCase: RequestsFindByIdUseCaseDto,
    private readonly filteredUseCase: RequestsFilteredUseCase,
    private readonly createUseCase: RequestsCreatedUseCaseDto,
    private readonly updateUseCase: RequestsUpdateUseCaseDto,
    private readonly deleteUseCase: RequestsDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationRequest> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(requestId: string): Promise<RequestDetails | null> {
    return await this.findByIdUseCase.execute(requestId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationRequest> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<RequestFormProps>): Promise<RequestDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<RequestFormProps>): Promise<RequestDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(requestId: string): Promise<void> {
    return await this.deleteUseCase.execute(requestId)
  }
}
