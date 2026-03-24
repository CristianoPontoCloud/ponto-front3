import type { CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies";
import type { EditDto } from "@/domain/http/http-client";
import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";


export interface CompaniesUpdateUseCaseDto {
  execute(body: EditDto<CompanyFormProps>): Promise<CreateCompanyResponse | null>
}

export class CompaniesUpdateUseCase implements CompaniesUpdateUseCaseDto {
  constructor(private readonly endpoint: CompaniesEndpoint) { }

  async execute(body: EditDto<CompanyFormProps>): Promise<CreateCompanyResponse | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
