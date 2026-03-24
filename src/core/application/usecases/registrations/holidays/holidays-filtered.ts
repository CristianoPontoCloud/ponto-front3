import type { Holiday } from "@/domain/entities/holiday";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays";

type FilteredResponse = PaginationDto<Holiday[]>

export interface HolidaysFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class HolidaysFilteredUseCase implements HolidaysFilteredUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }
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
