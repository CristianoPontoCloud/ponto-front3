import type { OnCallDetails } from "@/domain/entities/on-call"
import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call"

export interface OnCallsFindByIdUseCaseDto {
  execute(oncallId: string): Promise<OnCallDetails | null>
}

export class OnCallsFindByIdUseCase implements OnCallsFindByIdUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }

  async execute(oncallId: string): Promise<OnCallDetails | null> {
    const res = await this.endpoint.findById(oncallId)
    return res?.data ?? null
  }
}
