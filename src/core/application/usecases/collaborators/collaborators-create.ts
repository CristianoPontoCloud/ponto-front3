import type { CollaboratorDetails, CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import type { CreateDto } from "@/domain/http/http-client";
import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";


export interface CollaboratorsCreatedUseCaseDto {
  execute(body: CreateDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null>
}

export class CollaboratorsCreatedUseCase implements CollaboratorsCreatedUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }

  async execute(body: CreateDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null> {
    let positionTrust: boolean | null = null
    if (body.positionTrust === 'true') {
      positionTrust = true
    }
    if (body.positionTrust === 'false') {
      positionTrust = false
    }
    const res = await this.endpoint.create({ ...body, positionTrust })
    return res?.data ?? null
  }
}
