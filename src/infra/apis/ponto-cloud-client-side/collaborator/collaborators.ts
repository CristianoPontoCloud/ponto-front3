import type { Collaborator, CollaboratorDetails, CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator"
import type { CollaboratorWorkJourneyParams } from "@/domain/entities/collaborator/collaborator-work-journey"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import { type CollaboratorApiResponse, CollaboratorWorkJourneyAdapter } from "@/infra/adapters/collaborators/collaborators-work-journey-adapter"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Collaborator[]>
type CreateCollaborator = CreateDto<
  Omit<CollaboratorFormProps, 'positionTrust'> & {
    positionTrust: boolean | null
  }
>
type EditCollaborator = EditDto<CollaboratorFormProps>
type WorkJourneyResponse = Pick<CollaboratorDetails, | 'hourBanks' | 'extraHours'>

interface CollaboratorsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(collaboratorId: string): Promise<AxiosResponse<CollaboratorDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateCollaborator): Promise<AxiosResponse<CollaboratorDetails>>
  update(body: EditCollaborator): Promise<AxiosResponse<CollaboratorDetails>>
  updateWorkJourney(body: CollaboratorWorkJourneyParams): Promise<AxiosResponse<WorkJourneyResponse>>
  delete(positionId: string): Promise<AxiosResponse<void>>
}

export class CollaboratorsEndpoint implements CollaboratorsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/collaborator'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(collaboratorId: string): Promise<AxiosResponse<CollaboratorDetails>> {
    const response = await this.client.get<CollaboratorApiResponse>(`${this.endpoint}/${collaboratorId}`)
    const { extraHours, hourBanks } = new CollaboratorWorkJourneyAdapter().execute(response.data)
    return {
      ...response,
      data: {
        ...response.data,
        extraHours,
        hourBanks,
      } as unknown as CollaboratorDetails
    }
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateCollaborator): Promise<AxiosResponse<CollaboratorDetails>> {
    return await this.client.post<CreateCollaborator, CollaboratorDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditCollaborator): Promise<AxiosResponse<CollaboratorDetails>> {
    return await this.client.put<EditCollaborator, CollaboratorDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async updateWorkJourney(body: CollaboratorWorkJourneyParams): Promise<AxiosResponse<WorkJourneyResponse>> {
    const response = await this.client.put<CollaboratorWorkJourneyParams, CollaboratorApiResponse>({ body, url: `${this.endpoint}/work-journey` })
    const adaptedData = new CollaboratorWorkJourneyAdapter().execute(response.data)
    return {
      ...response,
      data: adaptedData
    }
  }
  async delete(collaboratorId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${collaboratorId}`)
  }
}
