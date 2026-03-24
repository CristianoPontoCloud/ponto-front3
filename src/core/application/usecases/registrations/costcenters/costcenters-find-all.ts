import type { CostCenter } from "@/domain/entities/center-cost";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters";

type FindAll = PaginationDto<CostCenter[]>

export interface CostCentersFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class CostCentersFindAllUseCase implements CostCentersFindAllUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const response = await this.endpoint.findAll(formatedUrlParams)
    return response?.data ?? []
  }
}
