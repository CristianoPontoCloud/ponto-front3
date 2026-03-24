import type { Occurrence } from "@/domain/entities/occurrence";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";

type FilteredResponse = PaginationDto<Occurrence[]>

export interface OccurrencesFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class OccurrencesFilteredUseCase implements OccurrencesFilteredUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }
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
