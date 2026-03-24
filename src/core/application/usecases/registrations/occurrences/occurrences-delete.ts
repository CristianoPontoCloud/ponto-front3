import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences"


export interface OccurrencesDeleteUseCaseDto {
  execute(positionId: string): Promise<void>
}

export class OccurrencesDeleteUseCase implements OccurrencesDeleteUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }
  async execute(positionId: string): Promise<void> {
    const response = await this.endpoint.delete(positionId)
    return response?.data
  }
}
