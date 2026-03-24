import type { TurnWithCollaboratorsAndPolicy } from "@/domain/entities/turns/turns";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

type FilteredResponse = PaginationDto<TurnWithCollaboratorsAndPolicy[]>;

export interface TurnsFilteredUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FilteredResponse>;
}

export class TurnsFilteredUseCase implements TurnsFilteredUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}
	async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
		const parsedParams = {
			limit: params?.limit ?? "20",
			page: params?.limit ?? "1",
			name: params?.name ?? "",
			status: params?.status ?? "ACTIVE",
			companyId: params?.companyId ?? "",
		};
		const urlParams = new URLSearchParams(
			(parsedParams as Record<string, string>) ?? {},
		).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		const { data } = await this.endpoint.filtered(formatedUrlParams);
		return data;
	}
}
