import type { Position } from "@/domain/entities/positions";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";

type FindAllResponse = PaginationDto<Position[]>

export interface PositionsFindAllPreBuiltUseCaseDto {
  execute(): Promise<FindAllResponse>
}

export class PositionsFindAllPreBuiltUseCase implements PositionsFindAllPreBuiltUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }
  async execute(): Promise<FindAllResponse> {
    const { data } = await this.endpoint.findAll()
    return data
  }
}
