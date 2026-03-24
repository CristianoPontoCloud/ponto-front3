import type { MarkHourBankEntryBulkFormProps, MarkHourBankEntryDetails } from "@/domain/entities/marks/settings/mark-hour-bank";
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter";


export interface HourBankEntryCreatedBulkUseCaseDto {
  execute(body: MarkHourBankEntryBulkFormProps): Promise<MarkHourBankEntryDetails[] | null>
}

export class HourBankEntryCreatedBulkUseCase implements HourBankEntryCreatedBulkUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }

  async execute(body: MarkHourBankEntryBulkFormProps): Promise<MarkHourBankEntryDetails[] | null> {
    const entries = this.adapter.adaptEntriesOnPost(body.entries as MarkHourBankEntryDetails[])
    const res = await this.endpoint.creatBulk({ entries })
    if (!res?.data) return null
    return this.adapter.adaptEntriesOnPost(res.data)
  }
}
