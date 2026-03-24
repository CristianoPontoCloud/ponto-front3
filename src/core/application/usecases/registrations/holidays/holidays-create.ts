import type { HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday";
import type { CreateDto } from "@/domain/http/http-client";
import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays";


export interface HolidaysCreatedUseCaseDto {
  execute(body: CreateDto<HolidayFormProps>): Promise<HolidayDetails | null>
}

export class HolidaysCreatedUseCase implements HolidaysCreatedUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }

  async execute(body: CreateDto<HolidayFormProps>): Promise<HolidayDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
