import { TurnPatternConfigFacade } from "@/application/facades/hours/turns-pattern-config-facade";
import { TurnPatternConfigCreatedUseCase } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-create";
import { TurnPatternConfigDeleteUseCase } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-delete";
import { TurnPatternConfigFindAllUseCase } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-find-all";
import { TurnPatternConfigFindByIdUseCase } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-find-by-id";
import { TurnPatternConfigUpdateUseCase } from "@/application/usecases/hours/turn-pattern-config/turn-pattern-config-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

export function turnPatternConfigFacadeFactory(token: string): TurnPatternConfigFacade {
	const endpoint = new TurnPatternConfigEndpoint(createPontoCloudApi(token));
	const findAllUseCase = new TurnPatternConfigFindAllUseCase(endpoint);
	const findByIdUseCase = new TurnPatternConfigFindByIdUseCase(endpoint);
	const createUseCase = new TurnPatternConfigCreatedUseCase(endpoint);
	const updateUseCase = new TurnPatternConfigUpdateUseCase(endpoint);
	const deleteUseCase = new TurnPatternConfigDeleteUseCase(endpoint);

	return new TurnPatternConfigFacade(
		findAllUseCase,
		findByIdUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
