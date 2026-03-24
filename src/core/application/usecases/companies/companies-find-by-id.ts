import type { CompanyDetails } from "@/domain/entities/companies";
import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";


export interface CompaniesFindByIdUseCaseDto {
  execute(companyId: string): Promise<CompanyDetails | null>
}

export class CompaniesFindByIdUseCase implements CompaniesFindByIdUseCaseDto {
  constructor(private readonly endpoint: CompaniesEndpoint) { }

  async execute(companyId: string): Promise<CompanyDetails | null> {
    const res = await this.endpoint.findById(companyId)
    return res?.data ?? null
  }
}
