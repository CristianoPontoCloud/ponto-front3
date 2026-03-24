import type { Company } from "@/domain/entities/companies";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";

type FilteredResponse = PaginationDto<Company[]>

export interface CompaniesFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class CompaniesFilteredUseCase implements CompaniesFilteredUseCaseDto {
  constructor(private readonly endpoint: CompaniesEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
    const serializedParams = buildQueryParamsAndSerialized({
      limit: params?.limit ?? "20",
      page: params?.limit ?? "1",
      name: params?.name ?? "",
      status: params?.status ?? "ACTIVE",
      companyId: params?.companyId ?? "",
      parentCompanyId: params?.parentCompanyId ?? ""
    })

    const { data } = await this.endpoint.filtered(serializedParams)

    return data
  }
}
