import type { Plan } from "@/domain/entities/plan"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Plan[]>
// type CreateCollaborator = CreateDto<CollaboratorFormProps>
// type EditCollaborator = EditDto<CollaboratorFormProps>

interface PlanEndPointDto {
  findAll(): Promise<AxiosResponse<FindAllResponse>>

}

export class PlanEndpoint implements PlanEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/plan/findAllPreBuilt'

  async findAll(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}`)
  }

}
