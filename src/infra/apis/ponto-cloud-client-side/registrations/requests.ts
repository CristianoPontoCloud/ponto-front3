import type { Request, RequestDetails, RequestFormProps } from "@/domain/entities/request"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Request[]>
type CreateRequest = CreateDto<RequestFormProps>
type EditRequest = EditDto<RequestFormProps>

interface RequestsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(requestId: string): Promise<AxiosResponse<RequestDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateRequest): Promise<AxiosResponse<RequestDetails>>
  update(body: EditRequest): Promise<AxiosResponse<RequestDetails>>
  delete(requestId: string): Promise<AxiosResponse<void>>
}

export class RequestsEndpoint implements RequestsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/request'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(requestId: string): Promise<AxiosResponse<RequestDetails>> {
    return await this.client.get<RequestDetails>(`${this.endpoint}/${requestId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateRequest): Promise<AxiosResponse<RequestDetails>> {
    return await this.client.post<CreateRequest, RequestDetails>({ body, url: `${this.endpoint} ` })
  }
  async update(body: EditRequest): Promise<AxiosResponse<RequestDetails>> {
    return await this.client.put<EditRequest, RequestDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(requestId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${requestId}`)
  }

}
