import type { Receipts } from "@/domain/entities/receipts/receipts";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ReceiptsEndpoint } from "@/infra/apis/ponto-cloud-client-side/receipts";

type FilteredResponse = PaginationDto<Receipts[]>

export interface ReceiptsFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class ReceiptsFilteredUseCase implements ReceiptsFilteredUseCaseDto {
  constructor(private readonly endpoint: ReceiptsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredResponse> {
    const serializedParams = buildQueryParamsAndSerialized({
      limit: params?.limit ?? "20",
      page: params?.limit ?? "1",
      name: params?.name ?? "",
      status: params?.status ?? "ACTIVE",
      companyId: params?.companyId ?? ""
    })

    const { data } = await this.endpoint.filtered(serializedParams)

    return data
  }
}
