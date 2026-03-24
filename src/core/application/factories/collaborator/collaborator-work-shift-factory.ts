import { CollaboratorWorkShiftFacade } from "@/application/facades/collaborator-work-shift-facade";
import { CollaboratorWorkShiftFindByIdUseCase } from "@/application/usecases/collaborators-work-shift/collaborator-find-by-id";
import { CollaboratorWorkShiftCreatedUseCase } from "@/application/usecases/collaborators-work-shift/collaborators-create";
import { CollaboratorWorkShiftDeleteUseCase } from "@/application/usecases/collaborators-work-shift/collaborators-delete";
import { CollaboratorWorkShiftFindAllUseCase } from "@/application/usecases/collaborators-work-shift/collaborators-find-all";
import { CollaboratorWorkShiftTemporaryOverrideUseCase } from "@/application/usecases/collaborators-work-shift/collaborators-temporary-override";
import { CollaboratorWorkShiftUpdateUseCase } from "@/application/usecases/collaborators-work-shift/collaborators-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift";

export function collaboratorWorkShiftFacadeFactory(token: string): CollaboratorWorkShiftFacade {
	const endpoint = new CollaboratorWorkShiftEndpoint(createPontoCloudApi(token));
	const findAllUseCase = new CollaboratorWorkShiftFindAllUseCase(endpoint);
	const findByIdUseCase = new CollaboratorWorkShiftFindByIdUseCase(endpoint);
	const createUseCase = new CollaboratorWorkShiftCreatedUseCase(endpoint);
	const temporaryOverrideUseCase = new CollaboratorWorkShiftTemporaryOverrideUseCase(endpoint);
	const updateUseCase = new CollaboratorWorkShiftUpdateUseCase(endpoint);
	const deleteUseCase = new CollaboratorWorkShiftDeleteUseCase(endpoint);
	return new CollaboratorWorkShiftFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		temporaryOverrideUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
