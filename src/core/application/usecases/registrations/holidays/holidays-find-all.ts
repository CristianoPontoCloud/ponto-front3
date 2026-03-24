import type { Holiday } from "@/domain/entities/holiday";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays";

type FilteredResponse = PaginationDto<Holiday[]>

export interface HolidaysFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class HolidaysFindAllUseCase implements HolidaysFindAllUseCaseDto {
  constructor(private readonly endpoint: HolidaysEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const response = await this.endpoint.findAll(formatedUrlParams)
    return response?.data ?? []
  }
}
