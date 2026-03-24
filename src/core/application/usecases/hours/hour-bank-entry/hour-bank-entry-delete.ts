import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry"


export interface HourBankEntryDeleteUseCaseDto {
  execute(hourBankEntryId: string): Promise<void>
}

export class HourBankEntryDeleteUseCase implements HourBankEntryDeleteUseCaseDto {
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }
  async execute(hourBankEntryId: string): Promise<void> {
    const { data } = await this.endpoint.delete(hourBankEntryId)
    return data
  }
}
