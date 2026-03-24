import { TurnsFacade } from "@/application/facades/hours/turns-facade";
import { TurnsCreatedUseCase } from "@/application/usecases/hours/turns/turns-create";
import { TurnsDeleteUseCase } from "@/application/usecases/hours/turns/turns-delete";
import { TurnsFilteredUseCase } from "@/application/usecases/hours/turns/turns-filtered";
import { TurnsFindAllUseCase } from "@/application/usecases/hours/turns/turns-find-all";
import { TurnsFindByIdUseCase } from "@/application/usecases/hours/turns/turns-find-by-id";
import { TurnsUpdateUseCase } from "@/application/usecases/hours/turns/turns-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

export function turnsFacadeFactory(token: string): TurnsFacade {
	const endpoint = new TurnsEndpoint(createPontoCloudApi(token));
	const findAllUseCase = new TurnsFindAllUseCase(endpoint);
	const filteredUseCase = new TurnsFilteredUseCase(endpoint);
	const findByIdUseCase = new TurnsFindByIdUseCase(endpoint);
	const createUseCase = new TurnsCreatedUseCase(endpoint);
	const updateUseCase = new TurnsUpdateUseCase(endpoint);
	const deleteUseCase = new TurnsDeleteUseCase(endpoint);

	return new TurnsFacade(
		findAllUseCase,
		findByIdUseCase,
		filteredUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
