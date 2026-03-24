import type {
	RequestInstanceDetails,
	RequestInstanceFindAllPendingParamsDto,
} from "@/domain/entities/request-instance/request-instance";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

type FindAllPendingResponse = PaginationDto<RequestInstanceDetails[]>;

export interface RequestInstanceFindAllPendingUseCaseDto {
	execute(params: RequestInstanceFindAllPendingParamsDto): Promise<FindAllPendingResponse>;
}

export class RequestInstanceFindAllPendingUseCase
	implements RequestInstanceFindAllPendingUseCaseDto
{
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute({
		companyId,
		limit,
		page,
	}: RequestInstanceFindAllPendingParamsDto): Promise<FindAllPendingResponse> {
		const serializedParams = buildQueryParamsAndSerialized({
			limit: limit ?? "20",
			page: page ?? "1",
		});

		const { data } = await this.endpoint.findAllPending({
			urlParams: serializedParams,
			companyId: companyId,
		});

		return data;
	}
}
