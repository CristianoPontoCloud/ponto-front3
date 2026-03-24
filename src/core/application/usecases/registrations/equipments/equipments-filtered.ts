import type { Equipment } from "@/domain/entities/equipment";
import { buildQueryParamsAndSerialized } from "@/domain/http/build-query-params";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments";

type FilteredResponse = PaginationDto<Equipment[]>

export interface EquipmentsFilteredUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredResponse>
}

export class EquipmentsFilteredUseCase implements EquipmentsFilteredUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }
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
