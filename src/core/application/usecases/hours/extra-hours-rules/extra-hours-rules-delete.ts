import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";

export interface ExtraHoursRulesDeleteUseCaseDto {
	execute(ruleId: string): Promise<void>;
}

export class ExtraHoursRulesDeleteUseCase implements ExtraHoursRulesDeleteUseCaseDto {
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) {}
	async execute(ruleId: string): Promise<void> {
		const { data } = await this.endpoint.delete(ruleId);
		return data;
	}
}
