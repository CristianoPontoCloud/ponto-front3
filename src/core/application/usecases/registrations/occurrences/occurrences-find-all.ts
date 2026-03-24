import type { Occurrence } from "@/domain/entities/occurrence";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";

type FindAllResponse = PaginationDto<Occurrence[]>

export interface OccurrencesFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAllResponse>
}

export class OccurrencesFindAllUseCase implements OccurrencesFindAllUseCaseDto {
  constructor(private readonly endpoint: OccurrencesEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAllResponse> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
