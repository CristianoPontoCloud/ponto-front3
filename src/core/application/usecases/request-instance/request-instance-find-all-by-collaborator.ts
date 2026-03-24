import type {
	RequestInstanceDetails,
	RequestInstanceFindAllByCollaboratorParamsDto,
} from "@/domain/entities/request-instance/request-instance";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

type FindAllByCollaboratorResponse = PaginationDto<RequestInstanceDetails[]>;

export interface RequestInstanceFindAllByCollaboratorUseCaseDto {
	execute(
		params: RequestInstanceFindAllByCollaboratorParamsDto,
	): Promise<FindAllByCollaboratorResponse>;
}

export class RequestInstanceFindAllByCollaboratorUseCase
	implements RequestInstanceFindAllByCollaboratorUseCaseDto
{
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute({
		collaboratorId,
		limit,
		page,
		companyId,
	}: RequestInstanceFindAllByCollaboratorParamsDto): Promise<FindAllByCollaboratorResponse> {
		const serializedParams = buildQueryParamsAndSerialized({
			limit: limit ?? "20",
			page: page ?? "1",
			companyId: companyId ?? "",
		});

		const { data } = await this.endpoint.findAllByCollaborator({
			urlParams: serializedParams,
			collaboratorId: collaboratorId,
		});

		return data;
	}
}
