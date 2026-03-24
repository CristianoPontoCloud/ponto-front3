import type { PositionDetails, PositionFormProps } from "@/domain/entities/positions";
import type { CreateDto } from "@/domain/http/http-client";
import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";


export interface PositionsCreatedUseCaseDto {
  execute(body: CreateDto<PositionFormProps>): Promise<PositionDetails | null>
}

export class PositionsCreatedUseCase implements PositionsCreatedUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }

  async execute(body: CreateDto<PositionFormProps>): Promise<PositionDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
