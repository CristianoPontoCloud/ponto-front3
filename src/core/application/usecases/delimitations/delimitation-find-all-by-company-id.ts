import type { GeoFence } from "@/domain/entities/delimitation";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations";

type FilteredResponse = PaginationDto<GeoFence[]>

export interface DelimitationsFindAllByCompanyIdUseCaseDto {
  execute(): Promise<FilteredResponse>
}

export class DelimitationsFindAllByCompanyIdUseCase implements DelimitationsFindAllByCompanyIdUseCaseDto {
  constructor(private readonly endpoint: DelimitationsEndpoint) { }
  async execute(): Promise<FilteredResponse> {
    const { data } = await this.endpoint.findAllByCompanyId()
    return data ?? null
  }
}
