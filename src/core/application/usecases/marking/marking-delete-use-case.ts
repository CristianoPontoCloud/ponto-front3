import type { MarkingEndpoint } from "@/infra/apis/ponto-cloud-client-side/marking";


export interface MarkingDeleteUseCaseDto {
  execute(markingId: string): Promise<void>
}

export class MarkingDeleteUseCase implements MarkingDeleteUseCaseDto {
  constructor(
    private readonly endpoint: MarkingEndpoint,
  ) { }

  async execute(markingId: string): Promise<void> {
    await this.endpoint.delete(markingId)
    // return res?.data ?? null
  }
}
