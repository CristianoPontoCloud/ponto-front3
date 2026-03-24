import type { CostCenterDetails } from "@/domain/entities/center-cost"
import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters"

export interface CostCentersFindByIdUseCaseDto {
  execute(costCenterId: string): Promise<CostCenterDetails | null>
}

export class CostCentersFindByIdUseCase implements CostCentersFindByIdUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }

  async execute(costCenterId: string): Promise<CostCenterDetails | null> {
    const res = await this.endpoint.findById(costCenterId)
    return res?.data ?? null
  }
}
