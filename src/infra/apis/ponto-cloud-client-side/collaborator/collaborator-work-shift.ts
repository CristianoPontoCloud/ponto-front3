import type { CollaboratorWorkShift, CollaboratorWorkShiftCreateParams, CollaboratorWorkShiftUpdateParams } from "@/domain/entities/collaborator/collaborator-work-shift"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAll = PaginationDto<CollaboratorWorkShift[]>

interface CollaboratorWorkShiftEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAll>>
  findById(companyId: string): Promise<AxiosResponse<CollaboratorWorkShift>>
  create(body: CollaboratorWorkShiftCreateParams): Promise<AxiosResponse<CollaboratorWorkShift>>
  temporaryOverride(body: CollaboratorWorkShiftCreateParams): Promise<AxiosResponse<CollaboratorWorkShift>>
  update(body: CollaboratorWorkShiftUpdateParams): Promise<AxiosResponse<CollaboratorWorkShift>>
  delete(id: string): Promise<AxiosResponse<void>>
}

export class CollaboratorWorkShiftEndpoint implements CollaboratorWorkShiftEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/collaborator-work-shift'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAll>> {
    return await this.client.get<FindAll>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(collaboratorWorkShiftId: string): Promise<AxiosResponse<CollaboratorWorkShift>> {
    return await this.client.get(`${this.endpoint}/${collaboratorWorkShiftId}`)
  }
  async create(body: CollaboratorWorkShiftCreateParams): Promise<AxiosResponse<CollaboratorWorkShift>> {
    return await this.client.post<CollaboratorWorkShiftCreateParams, CollaboratorWorkShift>({ body, url: this.endpoint })
  }
  async temporaryOverride(body: CollaboratorWorkShiftCreateParams): Promise<AxiosResponse<CollaboratorWorkShift>> {
    return await this.client.post<CollaboratorWorkShiftCreateParams, CollaboratorWorkShift>({ body, url: `${this.endpoint}/temporary-override` })
  }
  async update(body: CollaboratorWorkShiftUpdateParams): Promise<AxiosResponse<CollaboratorWorkShift>> {
    return await this.client.put<CollaboratorWorkShiftUpdateParams, CollaboratorWorkShift>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(collaboratorWorkShiftId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${collaboratorWorkShiftId}`)
  }
}
