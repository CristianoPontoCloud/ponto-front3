import type { OnCall, OnCallDetails, OnCallFormProps } from "@/domain/entities/on-call"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<OnCall[]>
type CreateOnCall = CreateDto<OnCallFormProps>
type EditOnCall = EditDto<OnCallFormProps>


interface OnCallsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(oncallId: string): Promise<AxiosResponse<OnCallDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateOnCall): Promise<AxiosResponse<OnCallDetails>>
  update(body: EditOnCall): Promise<AxiosResponse<OnCallDetails>>
  delete(oncallId: string): Promise<AxiosResponse<void>>
}

export class OnCallsEndpoint implements OnCallsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/on-notice'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(oncallId: string): Promise<AxiosResponse<OnCallDetails>> {
    return await this.client.get<OnCallDetails>(`${this.endpoint}/${oncallId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateOnCall): Promise<AxiosResponse<OnCallDetails>> {
    return await this.client.post<CreateOnCall, OnCallDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditOnCall): Promise<AxiosResponse<OnCallDetails>> {
    return await this.client.put<EditOnCall, OnCallDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(oncallId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${oncallId}`)
  }

}
