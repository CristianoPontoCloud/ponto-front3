import type { MarkHourBankEntryDetails } from "@/domain/entities/marks/settings/mark-hour-bank"
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry"
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter"

export interface HourBankEntryFindByIdUseCaseDto {
  execute(hourBankIEntryId: string): Promise<MarkHourBankEntryDetails | null>
}

export class HourBankEntryFindByIdUseCase implements HourBankEntryFindByIdUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }

  async execute(hourBankIEntryId: string): Promise<MarkHourBankEntryDetails | null> {
    const res = await this.endpoint.findById(hourBankIEntryId)
    if (!res?.data) return null
    return this.adapter.adaptEntryOnGet(res.data)
  }
}
