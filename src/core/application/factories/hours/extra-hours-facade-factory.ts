import { ExtraHoursFacade } from "@/application/facades/hours/extra-hours-facade";
import { ExtraHoursCreatedUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-create";
import { ExtraHoursDeleteUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-delete";
import { ExtraHoursFilteredUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-filtered";
import { ExtraHoursFindAllUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-find-all";
import { ExtraHoursFindByIdUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-find-by-id";
import { ExtraHoursUpdateUseCase } from "@/application/usecases/hours/extra-hours/extra-hours-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";

export function extraHoursFacadeFactory(token: string): ExtraHoursFacade {
	const endpoint = new ExtraHoursEndpoint(createPontoCloudApi(token));
	const findAllUseCase = new ExtraHoursFindAllUseCase(endpoint);
	const filteredUseCase = new ExtraHoursFilteredUseCase(endpoint);
	const findByIdUseCase = new ExtraHoursFindByIdUseCase(endpoint);
	const createUseCase = new ExtraHoursCreatedUseCase(endpoint);
	const updateUseCase = new ExtraHoursUpdateUseCase(endpoint);
	const deleteUseCase = new ExtraHoursDeleteUseCase(endpoint);

	return new ExtraHoursFacade(
		findAllUseCase,
		findByIdUseCase,
		filteredUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
