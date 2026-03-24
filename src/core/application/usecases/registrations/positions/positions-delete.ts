import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";


export interface PositionsDeleteUseCaseDto {
  execute(positionId: string): Promise<void>
}

export class PositionsDeleteUseCase implements PositionsDeleteUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }
  async execute(positionId: string): Promise<void> {
    const response = await this.endpoint.delete(positionId)
    return response?.data
  }
}
