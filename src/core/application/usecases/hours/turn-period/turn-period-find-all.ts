import type { TurnPeriod } from "@/domain/entities/turns/turn-period";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

type FindAll = PaginationDto<TurnPeriod[]>;

export interface TurnPeriodFindAllUseCaseDto {
	execute(params: FilteredParamsDto): Promise<FindAll>;
}

export class TurnPeriodFindAllUseCase implements TurnPeriodFindAllUseCaseDto {
	constructor(private readonly endpoint: TurnPeriodEndpoint) {}
	async execute(params: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll({ urlParams: formatedUrlParams });
		return data;
	}
}
