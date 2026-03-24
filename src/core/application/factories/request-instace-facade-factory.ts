import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";
import { RequestInstanceFacade } from "../facades/request-instace-facade";
import { RequestInstanceApproveUseCase } from "../usecases/request-instance/request-instance-approve";
import { RequestInstanceCancelUseCase } from "../usecases/request-instance/request-instance-cancel";
import { RequestInstanceCreateUseCase } from "../usecases/request-instance/request-instance-create";
import { RequestInstanceDeleteUseCase } from "../usecases/request-instance/request-instance-delete";
import { RequestInstanceFilteredUseCase } from "../usecases/request-instance/request-instance-filtered";
import { RequestInstanceFindAllByCollaboratorUseCase } from "../usecases/request-instance/request-instance-find-all-by-collaborator";
import { RequestInstanceFindAllPendingUseCase } from "../usecases/request-instance/request-instance-find-all-pending";
import { RequestInstanceFindByIdUseCase } from "../usecases/request-instance/request-instance-find-by-id";
import { RequestInstanceReasonUseCase } from "../usecases/request-instance/request-instance-reason";
import { RequestInstanceRejectUseCase } from "../usecases/request-instance/request-instance-reject";
import { RequestInstanceUpdateUseCase } from "../usecases/request-instance/request-instance-update";

export function requestInstanceFacadeFactory(token: string): RequestInstanceFacade {
	const endpoint = new RequestInstanceEndpoint(createPontoCloudApi(token));
	const findByIdUseCase = new RequestInstanceFindByIdUseCase(endpoint);
	const filteredUseCase = new RequestInstanceFilteredUseCase(endpoint);
	const findAllByCollaboratorUseCase = new RequestInstanceFindAllByCollaboratorUseCase(endpoint);
	const findAllPendingUseCase = new RequestInstanceFindAllPendingUseCase(endpoint);
	const createUseCase = new RequestInstanceCreateUseCase(endpoint);
	const updateUseCase = new RequestInstanceUpdateUseCase(endpoint);
	const deleteUseCase = new RequestInstanceDeleteUseCase(endpoint);
	const approveUseCase = new RequestInstanceApproveUseCase(endpoint);
	const rejectUseCase = new RequestInstanceRejectUseCase(endpoint);
	const cancelUseCase = new RequestInstanceCancelUseCase(endpoint);
	const reasonUseCase = new RequestInstanceReasonUseCase(endpoint);

	return new RequestInstanceFacade(
		findByIdUseCase,
		filteredUseCase,
		findAllByCollaboratorUseCase,
		findAllPendingUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
		approveUseCase,
		rejectUseCase,
		cancelUseCase,
		reasonUseCase,
	);
}
