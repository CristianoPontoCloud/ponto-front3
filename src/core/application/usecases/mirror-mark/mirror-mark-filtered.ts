import type { MirrorMark } from "@/domain/entities/mirror-mark/mirror-mark";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { MirrorMarkEndpoint } from "@/infra/apis/ponto-cloud-client-side/mirror-mark";

type FilteredResponse = PaginationDto<MirrorMark[]>

export interface MirrorMarkFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class MirrorMarkFilteredUseCase implements MirrorMarkFilteredUseCaseDto {
  constructor(private readonly endpoint: MirrorMarkEndpoint) { }
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
