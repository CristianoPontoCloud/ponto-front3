import { TurnPeriodFacade } from "@/application/facades/hours/turns-period-facade";
import { TurnPeriodCreatedUseCase } from "@/application/usecases/hours/turn-period/turn-period-create";
import { TurnPeriodDeleteUseCase } from "@/application/usecases/hours/turn-period/turn-period-delete";
import { TurnPeriodFindAllUseCase } from "@/application/usecases/hours/turn-period/turn-period-find-all";
import { TurnPeriodFindByIdUseCase } from "@/application/usecases/hours/turn-period/turn-period-find-by-id";
import { TurnPeriodUpdateUseCase } from "@/application/usecases/hours/turn-period/turn-period-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

interface TurnPeriodFacadeFactoryParams {
	token: string;
	turnId: string;
	dayId: string;
}

export function turnPeriodFacadeFactory({
	token,
	turnId,
	dayId,
}: TurnPeriodFacadeFactoryParams): TurnPeriodFacade {
	const endpoint = new TurnPeriodEndpoint(createPontoCloudApi(token), turnId, dayId);
	const findAllUseCase = new TurnPeriodFindAllUseCase(endpoint);
	const findByIdUseCase = new TurnPeriodFindByIdUseCase(endpoint);
	const createUseCase = new TurnPeriodCreatedUseCase(endpoint);
	const updateUseCase = new TurnPeriodUpdateUseCase(endpoint);
	const deleteUseCase = new TurnPeriodDeleteUseCase(endpoint);

	return new TurnPeriodFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
