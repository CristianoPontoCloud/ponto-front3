import type { CostCenterDetails, CostCenterFormProps } from "@/domain/entities/center-cost";
import type { CreateDto } from "@/domain/http/http-client";
import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters";


export interface CostCentersCreatedUseCaseDto {
  execute(body: CreateDto<CostCenterFormProps>): Promise<CostCenterDetails | null>
}

export class CostCentersCreatedUseCase implements CostCentersCreatedUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }

  async execute(body: CreateDto<CostCenterFormProps>): Promise<CostCenterDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
