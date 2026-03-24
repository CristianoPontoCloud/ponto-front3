import type { EquipmentDetails, EquipmentFormProps } from "@/domain/entities/equipment";
import type { CreateDto } from "@/domain/http/http-client";
import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments";


export interface EquipmentsCreatedUseCaseDto {
  execute(body: CreateDto<EquipmentFormProps>): Promise<EquipmentDetails | null>
}

export class EquipmentsCreatedUseCase implements EquipmentsCreatedUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }

  async execute(body: CreateDto<EquipmentFormProps>): Promise<EquipmentDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
