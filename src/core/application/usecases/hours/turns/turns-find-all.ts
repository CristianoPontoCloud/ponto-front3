import type { TurnWithCollaboratorsAndPolicy } from "@/domain/entities/turns/turns";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

type FindAll = PaginationDto<TurnWithCollaboratorsAndPolicy[]>;

export interface TurnsFindAllUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FindAll>;
}

export class TurnsFindAllUseCase implements TurnsFindAllUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}
	async execute(params?: FilteredParamsDto): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const response = await this.endpoint.findAll(formatedUrlParams);
		return response?.data ?? [];
	}
}
