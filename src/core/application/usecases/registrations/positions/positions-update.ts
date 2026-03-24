import type { PositionDetails, PositionFormProps } from "@/domain/entities/positions";
import type { EditDto } from "@/domain/http/http-client";
import type { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";

export interface PositionsUpdateUseCaseDto {
  execute(body: EditDto<PositionFormProps>): Promise<PositionDetails | null>
}

export class PositionsUpdateUseCase implements PositionsUpdateUseCaseDto {
  constructor(private readonly endpoint: PositionsEndpoint) { }

  async execute(body: EditDto<PositionFormProps>): Promise<PositionDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
