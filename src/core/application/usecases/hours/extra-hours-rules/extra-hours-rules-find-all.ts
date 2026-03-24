import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";
import { ExtraHourAdapterBands } from "./extra-hour-rules-adapter-bands";

type FindAll = PaginationDto<ExtraHourRules[]>;

export interface ExtraHoursRulesFindAllUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FindAll>;
}

export class ExtraHoursRulesFindAllUseCase implements ExtraHoursRulesFindAllUseCaseDto {
	private adapter = new ExtraHourAdapterBands();
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) { }
	async execute(params?: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll(formatedUrlParams);

		const adaptedDatas = data.data?.map((item) => ({
			...item,
			bands: this.adapter.adaptPercentageToString(item.bands),
		}));

		return { ...data, data: adaptedDatas };
	}
}
