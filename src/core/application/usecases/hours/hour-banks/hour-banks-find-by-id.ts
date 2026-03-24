import type { HourBankDetails } from "@/domain/entities/hour-bank"
import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks"

export interface HourBanksFindByIdUseCaseDto {
  execute(hourbankId: string): Promise<HourBankDetails | null>
}

export class HourBanksFindByIdUseCase implements HourBanksFindByIdUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }

  async execute(hourbankId: string): Promise<HourBankDetails | null> {
    const res = await this.endpoint.findById(hourbankId)
    if (!res?.data) return null
    return {
      ...res.data,
      resetDBEveryXMonths: String(res.data.resetDBEveryXMonths)
    }
  }
}
