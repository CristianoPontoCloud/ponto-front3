import type { OccurrenceDetails, OccurrenceFormProps } from "@/domain/entities/occurrence";
import type { EditDto } from "@/domain/http/http-client";
import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";

export interface OccurrencesUpdateUseCaseDto {
  execute(body: EditDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null>
}

export class OccurrencesUpdateUseCase implements OccurrencesUpdateUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }

  async execute(body: EditDto<OccurrenceFormProps>): Promise<OccurrenceDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
