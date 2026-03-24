import type { Department } from "@/domain/entities/department";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";

type FilteredResponse = PaginationDto<Department[]>

export interface DepartmentsFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class DepartmentsFilteredUseCase implements DepartmentsFilteredUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }
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
