import { ExtraHoursRulesFacade } from "@/application/facades/hours/extra-hours-rules-facade";
import { ExtraHoursRulesCreatedUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-create";
import { ExtraHoursRulesDeleteUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-delete";
import { ExtraHoursRulesFilteredUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-filtered";
import { ExtraHoursRulesFindAllUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-find-all";
import { ExtraHoursRulesFindByIdUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-find-by-id";
import { ExtraHoursRulesUpdateUseCase } from "@/application/usecases/hours/extra-hours-rules/extra-hours-rules-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";

export function extraHoursRulesFacadeFactory(token: string): ExtraHoursRulesFacade {
	const endpoint = new ExtraHourRulesEndPoint(createPontoCloudApi(token));
	const findAllUseCase = new ExtraHoursRulesFindAllUseCase(endpoint);
	const filteredUseCase = new ExtraHoursRulesFilteredUseCase(endpoint);
	const findByIdUseCase = new ExtraHoursRulesFindByIdUseCase(endpoint);
	const createUseCase = new ExtraHoursRulesCreatedUseCase(endpoint);
	const updateUseCase = new ExtraHoursRulesUpdateUseCase(endpoint);
	const deleteUseCase = new ExtraHoursRulesDeleteUseCase(endpoint);

	return new ExtraHoursRulesFacade(
		findAllUseCase,
		findByIdUseCase,
		filteredUseCase,
		createUseCase,
		updateUseCase,
		deleteUseCase,
	);
}
