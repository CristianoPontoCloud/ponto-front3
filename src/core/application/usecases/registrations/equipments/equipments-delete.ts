import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments"


export interface EquipmentsDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class EquipmentsDeleteUseCase implements EquipmentsDeleteUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
