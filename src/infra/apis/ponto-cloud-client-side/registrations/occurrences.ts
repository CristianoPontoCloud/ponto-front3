import type { Occurrence, OccurrenceDetails, OccurrenceFormProps } from "@/domain/entities/occurrence"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Occurrence[]>
type CreateRequest = CreateDto<OccurrenceFormProps>
type EditRequest = EditDto<OccurrenceFormProps>

interface OccurrencesEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(occurrenceId: string): Promise<AxiosResponse<OccurrenceDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateRequest): Promise<AxiosResponse<OccurrenceDetails>>
  update(body: EditRequest): Promise<AxiosResponse<OccurrenceDetails>>
  delete(occurrenceId: string): Promise<AxiosResponse<void>>
}

export class OccurrencesEndpoint implements OccurrencesEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/occurrence'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(occurrenceId: string): Promise<AxiosResponse<OccurrenceDetails>> {
    return await this.client.get<OccurrenceDetails>(`${this.endpoint}/${occurrenceId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateRequest): Promise<AxiosResponse<OccurrenceDetails>> {
    return await this.client.post<CreateRequest, OccurrenceDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditRequest): Promise<AxiosResponse<OccurrenceDetails>> {
    return await this.client.put<EditRequest, OccurrenceDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(occurrenceId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${occurrenceId}`)
  }

}
