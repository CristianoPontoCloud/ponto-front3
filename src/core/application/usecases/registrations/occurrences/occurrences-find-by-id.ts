import type { OccurrenceDetails } from "@/domain/entities/occurrence";
import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";


export interface OccurrencesFindByIdUseCaseDto {
  execute(occurrenceId: string): Promise<OccurrenceDetails | null>
}

export class OccurrencesFindByIdUseCase implements OccurrencesFindByIdUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }

  async execute(occurrenceId: string): Promise<OccurrenceDetails | null> {
    const res = await this.endpoint.findById(occurrenceId)
    return res?.data ?? null
  }
}
