import type { OnCall } from "@/domain/entities/on-call";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call";

type FilteredResponse = PaginationDto<OnCall[]>

export interface OnCallsFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class OnCallsFilteredUseCase implements OnCallsFilteredUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }
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
