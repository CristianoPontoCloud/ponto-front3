import type { OnCall } from "@/domain/entities/on-call";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call";

type FindAll = PaginationDto<OnCall[]>

export interface OnCallsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class OnCallsFindAllUseCase implements OnCallsFindAllUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
