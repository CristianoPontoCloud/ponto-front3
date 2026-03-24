import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";
import { ExtraHourAdapterBands } from "./extra-hour-rules-adapter-bands";

export interface ExtraHoursRulesFindByIdUseCaseDto {
	execute(extrahourId: string): Promise<ExtraHourRules | null>;
}

export class ExtraHoursRulesFindByIdUseCase implements ExtraHoursRulesFindByIdUseCaseDto {
	private adapter = new ExtraHourAdapterBands();
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) { }

	async execute(extrahourId: string): Promise<ExtraHourRules | null> {
		const res = await this.endpoint.findById(extrahourId);
		if (!res) return null;
		const adaptedResponse: ExtraHourRules = {
			...res.data,
			bands: this.adapter.adaptPercentageToString(res.data.bands),
		};
		return adaptedResponse;
	}
}
