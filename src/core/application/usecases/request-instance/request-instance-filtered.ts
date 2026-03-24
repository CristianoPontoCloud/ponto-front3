import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

type FilteredResponse = PaginationDto<RequestInstanceDetails[]>;

export interface RequestInstanceFilteredUseCaseDto {
	execute(params?: FilteredParamsDto): Promise<FilteredResponse>;
}

export class RequestInstanceFilteredUseCase implements RequestInstanceFilteredUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
		const serializedParams = buildQueryParamsAndSerialized({
			limit: params?.limit ?? "20",
			page: params?.limit ?? "1",
			name: params?.name ?? "",
			companyId: params?.companyId ?? "",
			collaboratorId: params?.collaboratorId ?? "",
		});

		const { data } = await this.endpoint.filtered(serializedParams);

		return data;
	}
}
