import type { CollaboratorDetails } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorWorkJourneyParams } from "@/domain/entities/collaborator/collaborator-work-journey";
import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";

type WorkJourneyResponse = Pick<CollaboratorDetails, 'hourBanks' | 'extraHours'>

export interface CollaboratorsUpdateWorkJourneyUseCaseDto {
  execute(body: CollaboratorWorkJourneyParams): Promise<WorkJourneyResponse | null>
}

export class CollaboratorsUpdateWorkJourneyUseCase implements CollaboratorsUpdateWorkJourneyUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }

  async execute(body: CollaboratorWorkJourneyParams): Promise<WorkJourneyResponse | null> {
    const res = await this.endpoint.updateWorkJourney(body)
    if (!res?.data) return null
    return res.data
  }
}
