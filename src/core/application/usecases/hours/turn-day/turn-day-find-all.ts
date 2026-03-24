import type { TurnDay } from "@/domain/entities/turns/turn-day";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

type FindAll = PaginationDto<TurnDay[]>;

export interface TurnDayFindAllUseCaseDto {
	execute(params: FilteredParamsDto): Promise<FindAll>;
}

export class TurnDayFindAllUseCase implements TurnDayFindAllUseCaseDto {
	constructor(private readonly endpoint: TurnDayEndpoint) {}
	async execute(params: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll({ urlParams: formatedUrlParams });
		return data;
	}
}
