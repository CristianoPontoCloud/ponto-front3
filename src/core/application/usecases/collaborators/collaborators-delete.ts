import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators"

export interface CollaboratorsDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class CollaboratorsDeleteUseCase implements CollaboratorsDeleteUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
