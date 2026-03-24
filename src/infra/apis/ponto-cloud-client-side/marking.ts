import type { Marking, MarkingFormProps } from "@/domain/entities/marking"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

// type FindAllResponse = PaginationDto<Marking[]>
type CreateMarking = CreateDto<MarkingFormProps>
type EditMarking = EditDto<MarkingFormProps>

interface MarkingEndPointDto {
  // findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  // findById(markingId: string): Promise<AxiosResponse<Marking>>
  // filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateMarking): Promise<AxiosResponse<CreateMarking>>
  update(body: EditMarking): Promise<AxiosResponse<CreateMarking>>
  delete(id: string): Promise<AxiosResponse<void>>
}

export class MarkingEndpoint implements MarkingEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/marking'

  // async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
  //   return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  // }
  // async findById(markingId: string): Promise<AxiosResponse<Marking>> {
  //   return await this.client.get(`${this.endpoint}/${markingId}`)
  // }
  // async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
  //   return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  // }
  async create(body: CreateMarking): Promise<AxiosResponse<Marking>> {
    return await this.client.post<CreateMarking, Marking>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditMarking): Promise<AxiosResponse<Marking>> {
    return await this.client.put<EditMarking, Marking>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(markingId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${markingId}`)
  }
}
