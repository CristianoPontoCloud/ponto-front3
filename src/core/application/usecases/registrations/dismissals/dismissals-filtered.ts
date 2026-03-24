import type { Dismissal } from "@/domain/entities/dismissal";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals";

type FilteredResponse = PaginationDto<Dismissal[]>

export interface DismissalsFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class DismissalsFilteredUseCase implements DismissalsFilteredUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }
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
