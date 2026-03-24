import type { DepartmentFindAllCompanyManagersResponse } from "@/domain/entities/department";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";

type PaginationManagers = PaginationDto<DepartmentFindAllCompanyManagersResponse[]>

export interface DepartmentsFindAllCompanyManagersUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<PaginationManagers>
}

export class DepartmentsFindAllCompanyManagersUseCase implements DepartmentsFindAllCompanyManagersUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<PaginationManagers> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAllCompanyManagers(formatedUrlParams)
    return data
  }
}
