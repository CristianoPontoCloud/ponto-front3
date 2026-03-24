import type { Holiday, HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Holiday[]>
type CreateHoliday = CreateDto<HolidayFormProps>
type EditHoliday = EditDto<HolidayFormProps>

interface HolidaysEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(holidayId: string): Promise<AxiosResponse<HolidayDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateHoliday): Promise<AxiosResponse<HolidayDetails>>
  update(body: EditHoliday): Promise<AxiosResponse<HolidayDetails>>
  delete(holidayId: string): Promise<AxiosResponse<void>>
}

export class HolidaysEndpoint implements HolidaysEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/holiday'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(holidayId: string): Promise<AxiosResponse<HolidayDetails>> {
    return await this.client.get<HolidayDetails>(`${this.endpoint}/${holidayId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateHoliday): Promise<AxiosResponse<HolidayDetails>> {
    return await this.client.post<CreateHoliday, HolidayDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditHoliday): Promise<AxiosResponse<HolidayDetails>> {
    return await this.client.put<EditHoliday, HolidayDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(holidayId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${holidayId}`)
  }

}
