import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";
import { CollaboratorsFacade } from "../../facades/collaborators-facade";
import { CollaboratorsFindByIdUseCase } from "../../usecases/collaborators/collaborator-find-by-id";
import { CollaboratorsCreatedUseCase } from "../../usecases/collaborators/collaborators-create";
import { CollaboratorsDeleteUseCase } from "../../usecases/collaborators/collaborators-delete";
import { CollaboratorsFilteredUseCase } from "../../usecases/collaborators/collaborators-filtered";
import { CollaboratorsFindAllUseCase } from "../../usecases/collaborators/collaborators-find-all";
import { CollaboratorsUpdateUseCase } from "../../usecases/collaborators/collaborators-update";
import { CollaboratorsUpdateWorkJourneyUseCase } from "../../usecases/collaborators/collaborators-update-work-journey";

export function collaboratorsFacadeFactory(token: string): CollaboratorsFacade {
  const endpoint = new CollaboratorsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new CollaboratorsFindAllUseCase(endpoint)
  const filteredUseCase = new CollaboratorsFilteredUseCase(endpoint)
  const findByIdUseCase = new CollaboratorsFindByIdUseCase(endpoint)
  const createUseCase = new CollaboratorsCreatedUseCase(endpoint)
  const updateUseCase = new CollaboratorsUpdateUseCase(endpoint)
  const updateWorkJourneyUseCase = new CollaboratorsUpdateWorkJourneyUseCase(endpoint)
  const deleteUseCase = new CollaboratorsDeleteUseCase(endpoint)

  return new CollaboratorsFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, updateWorkJourneyUseCase, deleteUseCase)
}
