import type { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests"


export interface RequestsDeleteUseCaseDto {
  execute(positionId: string): Promise<void>
}

export class RequestsDeleteUseCase implements RequestsDeleteUseCaseDto {
  constructor(private readonly endpoint: RequestsEndpoint) { }
  async execute(positionId: string): Promise<void> {
    const response = await this.endpoint.delete(positionId)
    return response?.data
  }
}
