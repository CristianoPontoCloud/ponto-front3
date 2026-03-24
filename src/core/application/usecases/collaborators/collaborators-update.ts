import type { CollaboratorDetails, CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import type { EditDto } from "@/domain/http/http-client";
import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";

export interface CollaboratorsUpdateUseCaseDto {
  execute(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null>
}

export class CollaboratorsUpdateUseCase implements CollaboratorsUpdateUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }

  async execute(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
