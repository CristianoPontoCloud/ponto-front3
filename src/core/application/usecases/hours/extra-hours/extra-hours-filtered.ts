import type { ExtraHourDetails } from "@/domain/entities/extra-hour/extra-hour";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";
import { ExtraHourAdapter } from "./extra-hours-adapter";

type FilteredResponse = PaginationDto<ExtraHourDetails[]>;

export interface ExtraHoursFilteredUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FilteredResponse>;
}

export class ExtraHoursFilteredUseCase implements ExtraHoursFilteredUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	private adapter = new ExtraHourAdapter();
	async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
		const serializedParams = buildQueryParamsAndSerialized({
			limit: params?.limit ?? "20",
			page: params?.limit ?? "1",
			name: params?.name ?? "",
			status: params?.status ?? "ACTIVE",
			companyId: params?.companyId ?? "",
		});

		const { data } = await this.endpoint.filtered(serializedParams);
		return { ...data, data: data.data?.map((extra) => (this.adapter.onGet(extra))) };
	}
}
