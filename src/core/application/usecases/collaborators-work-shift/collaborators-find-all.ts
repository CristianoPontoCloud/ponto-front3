import type { CollaboratorWorkShift, CollaboratorWorkShiftFindAllParams } from "@/domain/entities/collaborator/collaborator-work-shift";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift";

type FindAll = PaginationDto<CollaboratorWorkShift[]>

export interface CollaboratorWorkShiftFindAllUseCaseDto {
  execute(params?: CollaboratorWorkShiftFindAllParams): Promise<FindAll>
}

export class CollaboratorWorkShiftFindAllUseCase implements CollaboratorWorkShiftFindAllUseCaseDto {
  constructor(private readonly endpoint: CollaboratorWorkShiftEndpoint) { }
  async execute(params?: CollaboratorWorkShiftFindAllParams): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    return (await this.endpoint.findAll(formatedUrlParams))?.data
  }
}
