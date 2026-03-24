import type { HolidayDetails } from "@/domain/entities/holiday"
import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays"

export interface HolidaysFindByIdUseCaseDto {
  execute(holidayId: string): Promise<HolidayDetails | null>
}

export class HolidaysFindByIdUseCase implements HolidaysFindByIdUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }

  async execute(holidayId: string): Promise<HolidayDetails | null> {
    const response = await this.endpoint.findById(holidayId)
    // const fortmatResponse: HolidayDetails | null = res.data ? {
    //   ...res.data,
    //   date: new Date(res.data.date)
    // } : null
    return { ...response?.data, repeatHolidaysAllYears: response.data.repeatHolidaysAllYears ?? true }
  }
}
