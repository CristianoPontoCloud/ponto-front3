import type {
  CollaboratorExtraTime,
  CollaboratorExtraTimeFindAllParams,
} from "@/domain/entities/collaborator/collaborator-extra-time";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";

type FindAll = PaginationDto<CollaboratorExtraTime[]>;

export interface CollaboratorExtraTimeFindAllUseCaseDto {
	execute(params?: CollaboratorExtraTimeFindAllParams): Promise<FindAll>;
}

export class CollaboratorExtraTimeFindAllUseCase implements CollaboratorExtraTimeFindAllUseCaseDto {
	constructor(private readonly endpoint: CollaboratorExtraTimeEndpoint) {}
	async execute(params?: CollaboratorExtraTimeFindAllParams): Promise<FindAll> {
		const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
		const formatedUrlParams = urlParams ? `?${urlParams}` : "";
		return (await this.endpoint.findAll(formatedUrlParams))?.data;
	}
}
