import type { MirrorMark } from "@/domain/entities/mirror-mark/mirror-mark";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { ScopeEnum } from "@/domain/scope";
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
      year: params?.year ?? new Date().getFullYear().toString(),
      scope: params?.scope ?? ScopeEnum.MY,
      companyId: params?.companyId ?? "",
      collaboratorId: params?.collaboratorId ?? ""
    })

    const { data } = await this.endpoint.filtered(serializedParams)

    return {
      ...data,
      data: data.data?.map((mirrorMark) => ({ ...mirrorMark, id: `${mirrorMark.periodFrom}-${mirrorMark.periodTo}-${mirrorMark.isCurrent}` })) ?? []
    }
  }
}
