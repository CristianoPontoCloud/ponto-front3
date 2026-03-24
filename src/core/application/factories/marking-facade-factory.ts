import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { MarkingEndpoint } from "@/infra/apis/ponto-cloud-client-side/marking";
import { MarkingsFacade } from "../facades/marking-facade";
import { MarkingCreatedUseCase } from "../usecases/marking/marking-create-use-case";
import { MarkingDeleteUseCase } from "../usecases/marking/marking-delete-use-case";
import { MarkingUpdateUseCase } from "../usecases/marking/marking-update-use-case";

export function markingFacadeFactory(token: string): MarkingsFacade {
  const endpoint = new MarkingEndpoint(createPontoCloudApi(token))
  // const findAllUseCase = new CompaniesFindAllUseCase(endpoint)
  // const filteredUseCase = new CompaniesFilteredUseCase(endpoint)
  // const findByIdUseCase = new CompaniesFindByIdUseCase(endpoint)
  const createUseCase = new MarkingCreatedUseCase(endpoint)
  const updateUseCase = new MarkingUpdateUseCase(endpoint)
  const deleteUseCase = new MarkingDeleteUseCase(endpoint)

  return new MarkingsFacade(createUseCase, updateUseCase, deleteUseCase)
}
