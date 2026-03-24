import { TurnDayFacade } from "@/application/facades/hours/turns-day-facade";
import { TurnDayCreatedUseCase } from "@/application/usecases/hours/turn-day/turn-day-create";
import { TurnDayDeleteUseCase } from "@/application/usecases/hours/turn-day/turn-day-delete";
import { TurnDayFindAllUseCase } from "@/application/usecases/hours/turn-day/turn-day-find-all";
import { TurnDayFindByIdUseCase } from "@/application/usecases/hours/turn-day/turn-day-find-by-id";
import { TurnDayUpdateUseCase } from "@/application/usecases/hours/turn-day/turn-day-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

interface TurnDayFacadeFactoryParams {
	token: string;
	turnId: string;
}

export function turnDayFacadeFactory({ token, turnId }: TurnDayFacadeFactoryParams): TurnDayFacade {
	const endpoint = new TurnDayEndpoint(createPontoCloudApi(token), turnId);
	const findAllUseCase = new TurnDayFindAllUseCase(endpoint);
	const findByIdUseCase = new TurnDayFindByIdUseCase(endpoint);
	const createUseCase = new TurnDayCreatedUseCase(endpoint);
	const updateUseCase = new TurnDayUpdateUseCase(endpoint);
	const deleteUseCase = new TurnDayDeleteUseCase(endpoint);

	return new TurnDayFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
