import type { TurnPolicy } from "@/domain/entities/turns/turn-policy";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

type FindAll = PaginationDto<TurnPolicy[]>;

export interface TurnPolicyFindAllUseCaseDto {
	execute(params: FilteredParamsDto): Promise<FindAll>;
}

export class TurnPolicyFindAllUseCase implements TurnPolicyFindAllUseCaseDto {
	constructor(private readonly endpoint: TurnPolicyEndpoint) {}
	async execute(params: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.findAll({ urlParams: formatedUrlParams });
		return data;
	}
}
