import type { Marking, MarkingFormProps } from "@/domain/entities/marking";
import type { CreateDto } from "@/domain/http/http-client";
import type { MarkingEndpoint } from "@/infra/apis/ponto-cloud-client-side/marking";


export interface MarkingCreatedUseCaseDto {
  execute(body: CreateDto<MarkingFormProps>): Promise<Marking | null>
}

export class MarkingCreatedUseCase implements MarkingCreatedUseCaseDto {
  constructor(
    private readonly endpoint: MarkingEndpoint,
  ) { }

  async execute(body: CreateDto<MarkingFormProps>): Promise<Marking | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
