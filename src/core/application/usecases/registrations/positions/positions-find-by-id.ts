import type { PositionDetails } from "@/domain/entities/positions";
import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";


export interface PositionsFindByIdUseCaseDto {
  execute(positionId: string): Promise<PositionDetails | null>
}

export class PositionsFindByIdUseCase implements PositionsFindByIdUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }

  async execute(positionId: string): Promise<PositionDetails | null> {
    const res = await this.endpoint.findById(positionId)
    return res?.data ?? null
  }
}
