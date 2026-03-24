import type { MarkHourBankEntryBulkFormProps, MarkHourBankEntryDetails, MarkHourBankEntryFormProps } from "@/domain/entities/marks/settings/mark-hour-bank"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<MarkHourBankEntryDetails[]>
type CreateHourBankEntry = CreateDto<MarkHourBankEntryFormProps>
type UpdateHourBankEntry = EditDto<MarkHourBankEntryFormProps>


interface HourBankEntryEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(hourbankId: string): Promise<AxiosResponse<MarkHourBankEntryDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateHourBankEntry): Promise<AxiosResponse<MarkHourBankEntryDetails>>
  creatBulk(body: MarkHourBankEntryBulkFormProps): Promise<AxiosResponse<MarkHourBankEntryDetails[]>>
  update(body: UpdateHourBankEntry): Promise<AxiosResponse<MarkHourBankEntryDetails>>
  delete(hourBankEntryId: string): Promise<AxiosResponse<void>>
}

export class HourBankEntryEndpoint implements HourBankEntryEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/hour-bank-entry'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(hourbankId: string): Promise<AxiosResponse<MarkHourBankEntryDetails>> {
    return await this.client.get<MarkHourBankEntryDetails>(`${this.endpoint}/${hourbankId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateHourBankEntry): Promise<AxiosResponse<MarkHourBankEntryDetails>> {
    return await this.client.post<CreateHourBankEntry, MarkHourBankEntryDetails>({ body, url: `${this.endpoint}` })
  }
  async creatBulk(body: MarkHourBankEntryBulkFormProps): Promise<AxiosResponse<MarkHourBankEntryDetails[]>> {
    return await this.client.post<MarkHourBankEntryBulkFormProps, MarkHourBankEntryDetails[]>({ body, url: `${this.endpoint}/bulk` })
  }
  async update(body: UpdateHourBankEntry): Promise<AxiosResponse<MarkHourBankEntryDetails>> {
    return await this.client.put<UpdateHourBankEntry, MarkHourBankEntryDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(hourBankEntryId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${hourBankEntryId}`)
  }
}
