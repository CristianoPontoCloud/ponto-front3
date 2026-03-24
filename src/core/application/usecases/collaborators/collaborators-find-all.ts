import type { Collaborator } from "@/domain/entities/collaborator/collaborator";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorsEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborators";

type FindAll = PaginationDto<Collaborator[]>

export interface CollaboratorsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class CollaboratorsFindAllUseCase implements CollaboratorsFindAllUseCaseDto {
  constructor(private readonly endpoint: CollaboratorsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    return (await this.endpoint.findAll(formatedUrlParams))?.data
  }
}
