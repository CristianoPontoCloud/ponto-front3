import { CostCentersFacade } from "@/application/facades/registrations/costcenters-facade";
import { CostCentersCreatedUseCase } from "@/application/usecases/registrations/costcenters/costcenters-create";
import { CostCentersDeleteUseCase } from "@/application/usecases/registrations/costcenters/costcenters-delete";
import { CostCentersFilteredUseCase } from "@/application/usecases/registrations/costcenters/costcenters-filtered";
import { CostCentersFindAllUseCase } from "@/application/usecases/registrations/costcenters/costcenters-find-all";
import { CostCentersFindByIdUseCase } from "@/application/usecases/registrations/costcenters/costcenters-find-by-id";
import { CostCentersUpdateUseCase } from "@/application/usecases/registrations/costcenters/costcenters-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CostCentersEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/costcenters";

export function costcentersFacadeFactory(token: string): CostCentersFacade {
  const endpoint = new CostCentersEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new CostCentersFindAllUseCase(endpoint)
  const filteredUseCase = new CostCentersFilteredUseCase(endpoint)
  const findByIdUseCase = new CostCentersFindByIdUseCase(endpoint)
  const createUseCase = new CostCentersCreatedUseCase(endpoint)
  const updateUseCase = new CostCentersUpdateUseCase(endpoint)
  const deleteUseCase = new CostCentersDeleteUseCase(endpoint)

  return new CostCentersFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
