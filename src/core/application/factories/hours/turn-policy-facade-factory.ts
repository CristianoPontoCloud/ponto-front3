import { TurnPolicyFacade } from "@/application/facades/hours/turns-policy-facade";
import { TurnPolicyCreatedUseCase } from "@/application/usecases/hours/turn-policy/turn-policy-create";
import { TurnPolicyDeleteUseCase } from "@/application/usecases/hours/turn-policy/turn-policy-delete";
import { TurnPolicyFindAllUseCase } from "@/application/usecases/hours/turn-policy/turn-policy-find-all";
import { TurnPolicyFindByIdUseCase } from "@/application/usecases/hours/turn-policy/turn-policy-find-by-id";
import { TurnPolicyUpdateUseCase } from "@/application/usecases/hours/turn-policy/turn-policy-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

interface TurnPolicyFacadeFactoryParams {
	token: string;
	turnId: string;
}

export function turnPolicyFacadeFactory({
	token,
	turnId,
}: TurnPolicyFacadeFactoryParams): TurnPolicyFacade {
	const endpoint = new TurnPolicyEndpoint(createPontoCloudApi(token), turnId);
	const findAllUseCase = new TurnPolicyFindAllUseCase(endpoint);
	const findByIdUseCase = new TurnPolicyFindByIdUseCase(endpoint);
	const createUseCase = new TurnPolicyCreatedUseCase(endpoint);
	const updateUseCase = new TurnPolicyUpdateUseCase(endpoint);
	const deleteUseCase = new TurnPolicyDeleteUseCase(endpoint);

	return new TurnPolicyFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
