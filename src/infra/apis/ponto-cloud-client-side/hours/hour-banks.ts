import type { HourBank, HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<HourBank[]>
type CreateHourBank = CreateDto<HourBankFormProps>
type EditHourBank = EditDto<HourBankFormProps>


interface HourBanksEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(hourbankId: string): Promise<AxiosResponse<HourBankDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateHourBank): Promise<AxiosResponse<HourBankDetails>>
  update(body: EditHourBank): Promise<AxiosResponse<HourBankDetails>>
  delete(positionId: string): Promise<AxiosResponse<void>>
}

export class HourBanksEndpoint implements HourBanksEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/hour-bank'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(hourbankId: string): Promise<AxiosResponse<HourBankDetails>> {
    return await this.client.get<HourBankDetails>(`${this.endpoint}/${hourbankId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateHourBank): Promise<AxiosResponse<HourBankDetails>> {
    return await this.client.post<CreateHourBank, HourBankDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditHourBank): Promise<AxiosResponse<HourBankDetails>> {
    return await this.client.put<EditHourBank, HourBankDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(collaboratorId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${collaboratorId}`)
  }
}
