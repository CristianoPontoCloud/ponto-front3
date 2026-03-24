import type { EquipmentDetails, EquipmentFormProps } from "@/domain/entities/equipment";
import type { EditDto } from "@/domain/http/http-client";
import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments";

export interface EquipmentsUpdateUseCaseDto {
  execute(body: EditDto<EquipmentFormProps>): Promise<EquipmentDetails | null>
}

export class EquipmentsUpdateUseCase implements EquipmentsUpdateUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }

  async execute(body: EditDto<EquipmentFormProps>): Promise<EquipmentDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
