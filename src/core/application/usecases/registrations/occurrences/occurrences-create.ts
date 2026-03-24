import type { OccurrenceDetails, OccurrenceFormProps } from "@/domain/entities/occurrence";
import type { CreateDto } from "@/domain/http/http-client";
import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";


export interface OccurrencesCreatedUseCaseDto {
  execute(body: CreateDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null>
}

export class OccurrencesCreatedUseCase implements OccurrencesCreatedUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }

  async execute(body: CreateDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
