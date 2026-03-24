import type { MarkHourBankEntryDetails, MarkHourBankEntryFormProps } from "@/domain/entities/marks/settings/mark-hour-bank";
import type { CreateDto } from "@/domain/http/http-client";
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter";


export interface HourBankEntryCreatedUseCaseDto {
  execute(body: CreateDto<MarkHourBankEntryFormProps>): Promise<MarkHourBankEntryDetails | null>
}

export class HourBankEntryCreatedUseCase implements HourBankEntryCreatedUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }

  async execute(body: CreateDto<MarkHourBankEntryFormProps>): Promise<MarkHourBankEntryDetails | null> {
    const parsedBody = this.adapter.adaptEntryOnPost(body as MarkHourBankEntryDetails)
    const res = await this.endpoint.create(parsedBody)
    if (!res?.data) return null
    return this.adapter.adaptEntryOnGet(res.data)
  }
}
