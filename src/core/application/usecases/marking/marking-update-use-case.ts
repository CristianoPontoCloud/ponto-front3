import type { Marking, MarkingFormProps } from "@/domain/entities/marking";
import type { EditDto } from "@/domain/http/http-client";
import type { MarkingEndpoint } from "@/infra/apis/ponto-cloud-client-side/marking";


export interface MarkingUpdateUseCaseDto {
  execute(body: EditDto<MarkingFormProps>): Promise<Marking | null>
}

export class MarkingUpdateUseCase implements MarkingUpdateUseCaseDto {
  constructor(
    private readonly endpoint: MarkingEndpoint,
  ) { }

  async execute(body: EditDto<MarkingFormProps>): Promise<Marking | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
