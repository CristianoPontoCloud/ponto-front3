import { CollaboratorExtraTimeFindByIdUseCase } from "@/application/usecases/collaborators-extra-time/collaborator-find-by-id";
import { CollaboratorExtraTimeCreatedUseCase } from "@/application/usecases/collaborators-extra-time/collaborators-create";
import { CollaboratorExtraTimeDeleteUseCase } from "@/application/usecases/collaborators-extra-time/collaborators-delete";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";
import { CollaboratorExtraTimeFacade } from "../../facades/collaborator-extra-time-facade";
import { CollaboratorExtraTimeFindAllUseCase } from "../../usecases/collaborators-extra-time/collaborators-find-all";
import { CollaboratorExtraTimeUpdateUseCase } from "../../usecases/collaborators-extra-time/collaborators-update";

export function collaboratorExtraTimeFacadeFactory(token: string): CollaboratorExtraTimeFacade {
	const endpoint = new CollaboratorExtraTimeEndpoint(createPontoCloudApi(token));
	const findAllUseCase = new CollaboratorExtraTimeFindAllUseCase(endpoint);
	const findByIdUseCase = new CollaboratorExtraTimeFindByIdUseCase(endpoint);
	const createUseCase = new CollaboratorExtraTimeCreatedUseCase(endpoint);
	const updateUseCase = new CollaboratorExtraTimeUpdateUseCase(endpoint);
	const deleteUseCase = new CollaboratorExtraTimeDeleteUseCase(endpoint);
	return new CollaboratorExtraTimeFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
