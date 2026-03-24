import type { EquipmentDetails } from "@/domain/entities/equipment"
import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments"

export interface EquipmentsFindByIdUseCaseDto {
  execute(holidayId: string): Promise<EquipmentDetails | null>
}

export class EquipmentsFindByIdUseCase implements EquipmentsFindByIdUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }

  async execute(holidayId: string): Promise<EquipmentDetails | null> {
    const res = await this.endpoint.findById(holidayId)
    return res?.data ?? null
  }
}
