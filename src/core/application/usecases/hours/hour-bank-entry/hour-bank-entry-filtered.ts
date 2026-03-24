import type { MarkHourBankEntryDetails } from "@/domain/entities/marks/settings/mark-hour-bank";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";
import { HourBankEntryAdapter } from "./hour-bank-entry-adapter";

type FilteredResponse = PaginationDto<MarkHourBankEntryDetails[]>

export interface HourBankEntryFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class HourBankEntryFilteredUseCase implements HourBankEntryFilteredUseCaseDto {
  private adapter = new HourBankEntryAdapter()
  constructor(private readonly endpoint: HourBankEntryEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
    const serializedParams = buildQueryParamsAndSerialized({
      limit: params?.limit ?? "20",
      page: params?.limit ?? "1",
      name: params?.name ?? "",
      companyId: params?.companyId ?? "",
      hourBarnkId: params?.hourBankId ?? "",
      dateFrom: params?.dateFrom ?? "",
      dateTo: params?.dateTo ?? "",
    })

    const { data } = await this.endpoint.filtered(serializedParams)

    return {
      ...data,
      data: this.adapter.adaptEntriesOnGet(data?.data ?? [])
    }
  }
}
