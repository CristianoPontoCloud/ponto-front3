import type { MarkHourBankEntryDetails, MarkHourBankEntryFormProps } from "@/domain/entities/marks/settings/mark-hour-bank";
import type { EditDto } from "@/domain/http/http-client";
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter";

type UpdateHourBankEntry = EditDto<MarkHourBankEntryFormProps>

export interface HourBankEntryUpdateUseCaseDto {
  execute(body: UpdateHourBankEntry): Promise<MarkHourBankEntryDetails | null>
}

export class HourBankEntryUpdateUseCase implements HourBankEntryUpdateUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }

  async execute(body: UpdateHourBankEntry): Promise<MarkHourBankEntryDetails | null> {
    const parsedBody = this.adapter.adaptEntryOnPost(body as MarkHourBankEntryDetails)
    const res = await this.endpoint.update(parsedBody)
    if (!res?.data) return null
    return this.adapter.adaptEntryOnGet(res.data)
  }
}
