import type { Department } from "@/domain/entities/department";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";

type FindAll = PaginationDto<Department[]>

export interface DepartmentsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class DepartmentsFindAllUseCase implements DepartmentsFindAllUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
