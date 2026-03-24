import type { CostCenterDetails, CostCenterFormProps } from "@/domain/entities/center-cost";
import type { EditDto } from "@/domain/http/http-client";
import type { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters";

export interface CostCentersUpdateUseCaseDto {
  execute(body: EditDto<CostCenterFormProps>): Promise<CostCenterDetails | null>
}

export class CostCentersUpdateUseCase implements CostCentersUpdateUseCaseDto {
  constructor(private readonly endpoint: CostCentersEndpoint) { }

  async execute(body: EditDto<CostCenterFormProps>): Promise<CostCenterDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
