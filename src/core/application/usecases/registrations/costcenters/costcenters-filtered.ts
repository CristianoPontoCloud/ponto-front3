import type { CostCenter } from "@/domain/entities/center-cost";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters";

type FilteredResponse = PaginationDto<CostCenter[]>

export interface CostCentersFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class CostCentersFilteredUseCase implements CostCentersFilteredUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
    const serializedParams = buildQueryParamsAndSerialized({
      limit: params?.limit ?? "20",
      page: params?.limit ?? "1",
      name: params?.name ?? "",
      status: params?.status ?? "ACTIVE",
      companyId: params?.companyId ?? ""
    })

    const { data } = await this.endpoint.filtered(serializedParams)

    return data
  }
}
