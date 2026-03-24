import { RequestsCreatedUseCase } from "@/application/usecases/registrations/requests/requests-create";
import { RequestsDeleteUseCase } from "@/application/usecases/registrations/requests/requests-delete";
import { RequestsFilteredUseCase } from "@/application/usecases/registrations/requests/requests-filtered";
import { RequestsUpdateUseCase } from "@/application/usecases/registrations/requests/requests-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests";
import { RequestsFacade } from "../../facades/registrations/requests-facade";
import { RequestsFindAllUseCase } from "../../usecases/registrations/requests/requests-find-all";
import { RequestsFindByIdUseCase } from "../../usecases/registrations/requests/requests-find-by-id";

export function requestsFacadeFactory(token: string): RequestsFacade {
  const endpoint = new RequestsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new RequestsFindAllUseCase(endpoint)
  const filteredUseCase = new RequestsFilteredUseCase(endpoint)
  const findByIdUseCase = new RequestsFindByIdUseCase(endpoint)
  const createUseCase = new RequestsCreatedUseCase(endpoint)
  const updateUseCase = new RequestsUpdateUseCase(endpoint)
  const deleteUseCase = new RequestsDeleteUseCase(endpoint)

  return new RequestsFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
