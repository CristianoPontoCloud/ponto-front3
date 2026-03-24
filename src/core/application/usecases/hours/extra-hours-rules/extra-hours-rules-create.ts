import type {
	ExtraHourRules,
	ExtraHourRulesNumberMultiplier,
} from "@/domain/entities/extra-hour/extra-hour-rules";
import type { CreateDto } from "@/domain/http/http-client";
import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";
import { ExtraHourAdapterBands } from "./extra-hour-rules-adapter-bands";

export interface ExtraHoursRulesCreatedUseCaseDto {
	execute(params: CreateDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null>;
}

export class ExtraHoursRulesCreatedUseCase implements ExtraHoursRulesCreatedUseCaseDto {
	private adapter = new ExtraHourAdapterBands();
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) { }

	async execute(params: CreateDto<ExtraHourRules>): Promise<ExtraHourRulesNumberMultiplier | null> {
		const body: CreateDto<ExtraHourRulesNumberMultiplier> = {
			...params,
			bands: this.adapter.adaptPercentageToNumber(params.bands),
		};

		const res = await this.endpoint.create(body);

		return res?.data ?? null;
	}
}
