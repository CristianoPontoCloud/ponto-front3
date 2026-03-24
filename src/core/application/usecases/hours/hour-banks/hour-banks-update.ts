import type { HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank";
import type { EditDto } from "@/domain/http/http-client";
import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks";

export interface HourBanksUpdateUseCaseDto {
  execute(body: EditDto<HourBankFormProps>): Promise<HourBankDetails | null>
}

export class HourBanksUpdateUseCase implements HourBanksUpdateUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }

  async execute(body: EditDto<HourBankFormProps>): Promise<HourBankDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
