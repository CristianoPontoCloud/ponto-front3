import type { Request } from "@/domain/entities/request";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests";

type FindAllResponse = PaginationDto<Request[]>

export interface RequestsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAllResponse>
}

export class RequestsFindAllUseCase implements RequestsFindAllUseCaseDto {
  constructor(private readonly endpoint: RequestsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAllResponse> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
