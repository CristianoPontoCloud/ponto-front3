import type { Position } from "@/domain/entities/positions";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";

type FindAllResponse = PaginationDto<Position[]>

export interface PositionsFindAllUseCaseDto {
  execute(params?: FilteredParamsDto): Promise<FindAllResponse>
}

export class PositionsFindAllUseCase implements PositionsFindAllUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }
  async execute(): Promise<FindAllResponse> {
    const { data } = await this.endpoint.findAll()
    return data
  }
}
