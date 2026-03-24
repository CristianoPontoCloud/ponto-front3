import type {
	ExtraHourRules,
	ExtraHourRulesFilteredParamsDto
} from "@/domain/entities/extra-hour/extra-hour-rules";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ExtraHourRulesEndPoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour-rules";
import { ExtraHourAdapterBands } from "./extra-hour-rules-adapter-bands";

type FilteredResponse = PaginationDto<ExtraHourRules[]>;

export interface ExtraHoursRulesFilteredUseCaseDto {
	execute(params?: ExtraHourRulesFilteredParamsDto): Promise<FilteredResponse>;
}

export class ExtraHoursRulesFilteredUseCase implements ExtraHoursRulesFilteredUseCaseDto {
	private adapter = new ExtraHourAdapterBands();
	constructor(private readonly endpoint: ExtraHourRulesEndPoint) { }
	async execute(params?: ExtraHourRulesFilteredParamsDto): Promise<FilteredResponse> {
		const serializedParams = buildQueryParamsAndSerialized({
			limit: params?.limit ?? "20",
			page: params?.limit ?? "1",
			name: params?.name ?? "",
			status: params?.status ?? "ACTIVE",
			companyId: params?.companyId ?? "",
			extraTimeId: params?.extraHourId ?? "",
		});

		const { data } = await this.endpoint.filtered(serializedParams);

		const adaptedDatas = data.data?.map((item) => ({
			...item,
			bands: this.adapter.adaptPercentageToString(item.bands),
		}));

		return { ...data, data: adaptedDatas };
	}
}
