import type { MarkHourBankEntryDetails } from "@/domain/entities/marks/settings/mark-hour-bank";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter";

type FindAll = PaginationDto<MarkHourBankEntryDetails[]>

export interface HourBankEntryFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAll>
}

export class HourBankEntryFindAllUseCase implements HourBankEntryFindAllUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FindAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return {
      ...data,
      data: this.adapter.adaptEntriesOnGet(data?.data ?? [])
    }
  }
}
