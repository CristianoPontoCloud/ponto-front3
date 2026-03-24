import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies"


export interface CompaniesDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class CompaniesDeleteUseCase implements CompaniesDeleteUseCaseDto {
  constructor(private readonly endpoint: CompaniesEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
