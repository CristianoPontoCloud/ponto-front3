import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call"

export interface OnCallsDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class OnCallsDeleteUseCase implements OnCallsDeleteUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
