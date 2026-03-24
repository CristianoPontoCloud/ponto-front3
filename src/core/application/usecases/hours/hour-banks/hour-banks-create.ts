import type { HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank";
import type { CreateDto } from "@/domain/http/http-client";
import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks";


export interface HourBanksCreatedUseCaseDto {
  execute(body: CreateDto<HourBankFormProps>): Promise<HourBankDetails | null>
}

export class HourBanksCreatedUseCase implements HourBanksCreatedUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }

  async execute(body: CreateDto<HourBankFormProps>): Promise<HourBankDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
