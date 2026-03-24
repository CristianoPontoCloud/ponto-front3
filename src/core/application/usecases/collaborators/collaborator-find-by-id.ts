import type { CollaboratorDetails } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";


export interface CollaboratorsFindByIdUseCaseDto {
  execute(collaboratorId: string): Promise<CollaboratorDetails | null>
}

export class CollaboratorsFindByIdUseCase implements CollaboratorsFindByIdUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }

  async execute(collaboratorId: string): Promise<CollaboratorDetails | null> {
    const res = await this.endpoint.findById(collaboratorId)
    return {
      ...res.data,
    }
  }
}
