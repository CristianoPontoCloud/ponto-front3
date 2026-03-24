import type { ExtraHourDetails } from "@/domain/entities/extra-hour/extra-hour";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";
import { ExtraHourAdapter } from "./extra-hours-adapter";

type FindAll = PaginationDto<ExtraHourDetails[]>;

export interface ExtraHoursFindAllUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FindAll>;
}

export class ExtraHoursFindAllUseCase implements ExtraHoursFindAllUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	private adapter = new ExtraHourAdapter();
	async execute(params?: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll(formatedUrlParams);
		return { ...data, data: data.data?.map((extra) => (this.adapter.onGet(extra))) };
	}
}
