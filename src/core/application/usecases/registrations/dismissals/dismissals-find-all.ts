import type { Dismissal } from "@/domain/entities/dismissal";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals";

type FilteredAll = PaginationDto<Dismissal[]>

export interface DismissalsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredAll>
}

export class DismissalsFindAllUseCase implements DismissalsFindAllUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
