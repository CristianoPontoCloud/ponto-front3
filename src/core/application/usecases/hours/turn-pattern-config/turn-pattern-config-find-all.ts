import type { TurnPatternConfig } from "@/domain/entities/turns/turn-pattern-config";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

type FindAll = PaginationDto<TurnPatternConfig[]>;

export interface TurnPatternConfigFindAllUseCaseDto {
	execute(params: FilteredParamsDto): Promise<FindAll>;
}

export class TurnPatternConfigFindAllUseCase implements TurnPatternConfigFindAllUseCaseDto {
	constructor(private readonly endpoint: TurnPatternConfigEndpoint) {}
	async execute(params: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll({ urlParams: formatedUrlParams });
		return data;
	}
}
