import type {
	ExtraHourRules,
	ExtraHourRulesNumberMultiplier,
} from "@/domain/entities/extra-hour/extra-hour-rules";
import type { EditDto } from "@/domain/http/http-client";
import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";
import { ExtraHourAdapterBands } from "./extra-hour-rules-adapter-bands";

export interface ExtraHoursRulesUpdateUseCaseDto {
	execute(params: EditDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null>;
}

export class ExtraHoursRulesUpdateUseCase implements ExtraHoursRulesUpdateUseCaseDto {
	private adapter = new ExtraHourAdapterBands();
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) { }

	async execute(params: EditDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null> {
		const body: EditDto<ExtraHourRulesNumberMultiplier> = {
			...params,
			bands: this.adapter.adaptPercentageToNumber(params.bands),
		};

		const res = await this.endpoint.update(body);

		return res?.data ?? null;
	}
}
