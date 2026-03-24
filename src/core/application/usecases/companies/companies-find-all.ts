import type { Company } from "@/domain/entities/companies";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";

type FindAll = PaginationDto<Company[]>

export interface CompaniesFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class CompaniesFindAllUseCase implements CompaniesFindAllUseCaseDto {
  constructor(private readonly endpoint: CompaniesEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
