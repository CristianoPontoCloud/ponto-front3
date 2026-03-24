import type { HourBank } from "@/domain/entities/hour-bank";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks";

type FindAll = PaginationDto<HourBank[]>

export interface HourBanksFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class HourBanksFindAllUseCase implements HourBanksFindAllUseCaseDto {
  constructor(private readonly endpoint: HourBanksEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const response = await this.endpoint.findAll(formatedUrlParams)
    return response?.data ?? []
  }
}
