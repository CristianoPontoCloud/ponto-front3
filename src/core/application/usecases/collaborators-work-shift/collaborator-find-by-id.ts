import type { CollaboratorWorkShift } from "@/domain/entities/collaborator/collaborator-work-shift"
import type { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift"

export interface CollaboratorWorkShiftFindByIdUseCaseDto {
  execute(collaboratorWorkShiftId: string): Promise<CollaboratorWorkShift | null>
}

export class CollaboratorWorkShiftFindByIdUseCase implements CollaboratorWorkShiftFindByIdUseCaseDto {
  constructor(private readonly endpoint: CollaboratorWorkShiftEndpoint) { }

  async execute(collaboratorWorkShiftId: string): Promise<CollaboratorWorkShift | null> {
    const res = await this.endpoint.findById(collaboratorWorkShiftId)
    return {
      ...res.data,
    }
  }
}
