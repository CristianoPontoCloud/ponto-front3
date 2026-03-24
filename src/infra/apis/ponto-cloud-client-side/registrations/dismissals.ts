import type { Dismissal, DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Dismissal[]>
type CreateDismissal = CreateDto<DismissalFormProps>
type EditDismissal = EditDto<DismissalFormProps>

interface DismissalsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(dismissalId: string): Promise<AxiosResponse<DismissalDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateDismissal): Promise<AxiosResponse<DismissalDetails>>
  update(body: EditDismissal): Promise<AxiosResponse<DismissalDetails>>
  delete(dismissalId: string): Promise<AxiosResponse<void>>
}

export class DismissalsEndpoint implements DismissalsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/dismissal'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(dismissalId: string): Promise<AxiosResponse<DismissalDetails>> {
    return await this.client.get<DismissalDetails>(`${this.endpoint}/${dismissalId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateDismissal): Promise<AxiosResponse<DismissalDetails>> {
    return await this.client.post<CreateDismissal, DismissalDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditDismissal): Promise<AxiosResponse<DismissalDetails>> {
    return await this.client.put<EditDismissal, DismissalDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(dismissalId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${dismissalId}`)
  }

}
