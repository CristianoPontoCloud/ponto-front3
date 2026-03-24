import type { HourBank } from "@/domain/entities/hour-bank";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks";

type FilteredResponse = PaginationDto<HourBank[]>

export interface HourBanksFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class HourBanksFilteredUseCase implements HourBanksFilteredUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }
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
