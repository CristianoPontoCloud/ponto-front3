import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks"

export interface HourBanksDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class HourBanksDeleteUseCase implements HourBanksDeleteUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
