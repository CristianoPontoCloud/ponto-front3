import type { Equipment } from "@/domain/entities/equipment";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { EquipmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/equipments";

type FilteredAll = PaginationDto<Equipment[]>

export interface EquipmentsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FilteredAll>
}

export class EquipmentsFindAllUseCase implements EquipmentsFindAllUseCaseDto {
  constructor(private readonly endpoint: EquipmentsEndpoint) { }
  async execute(params?: FilteredParamsDto): Promise<FilteredAll> {
    const urlParams = new URLSearchParams((params as Record<string, string>) ?? {}).toString();
    const formatedUrlParams = urlParams ? `?${urlParams}` : '';
    const { data } = await this.endpoint.findAll(formatedUrlParams)
    return data
  }
}
