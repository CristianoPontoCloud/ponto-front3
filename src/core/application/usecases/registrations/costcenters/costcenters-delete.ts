import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters"


export interface CostCentersDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class CostCentersDeleteUseCase implements CostCentersDeleteUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
