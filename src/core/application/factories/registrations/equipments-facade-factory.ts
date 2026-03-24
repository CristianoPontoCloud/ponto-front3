import { EquipmentsFacade } from "@/application/facades/registrations/equipments-facade"
import { EquipmentsCreatedUseCase } from "@/application/usecases/registrations/equipments/equipments-create"
import { EquipmentsDeleteUseCase } from "@/application/usecases/registrations/equipments/equipments-delete"
import { EquipmentsFilteredUseCase } from "@/application/usecases/registrations/equipments/equipments-filtered"
import { EquipmentsFindAllUseCase } from "@/application/usecases/registrations/equipments/equipments-find-all"
import { EquipmentsFindByIdUseCase } from "@/application/usecases/registrations/equipments/equipments-find-by-id"
import { EquipmentsUpdateUseCase } from "@/application/usecases/registrations/equipments/equipments-update"
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments"

export function equipmentsFacadeFactory(token: string): EquipmentsFacade {
  const endpoint = new EquipmentsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new EquipmentsFindAllUseCase(endpoint)
  const filteredUseCase = new EquipmentsFilteredUseCase(endpoint)
  const findByIdUseCase = new EquipmentsFindByIdUseCase(endpoint)
  const createUseCase = new EquipmentsCreatedUseCase(endpoint)
  const updateUseCase = new EquipmentsUpdateUseCase(endpoint)
  const deleteUseCase = new EquipmentsDeleteUseCase(endpoint)

  return new EquipmentsFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
