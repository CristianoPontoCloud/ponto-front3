import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals"


export interface DismissalsDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class DismissalsDeleteUseCase implements DismissalsDeleteUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
