import type { HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday";
import type { EditDto } from "@/domain/http/http-client";
import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays";

export interface HolidaysUpdateUseCaseDto {
  execute(body: EditDto<HolidayFormProps>): Promise<HolidayDetails | null>
}

export class HolidaysUpdateUseCase implements HolidaysUpdateUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }

  async execute(body: EditDto<HolidayFormProps>): Promise<HolidayDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
