import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays"


export interface HolidaysDeleteUseCaseDto {
  execute(positionId: string): Promise<void>
}

export class HolidaysDeleteUseCase implements HolidaysDeleteUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }
  async execute(positionId: string): Promise<void> {
    const response = await this.endpoint.delete(positionId)
    return response?.data
  }
}
