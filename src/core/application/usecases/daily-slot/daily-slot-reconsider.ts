import type { DailySlotReconsiderParams } from "@/domain/entities/daily-slot/daily-slot";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotReconsiderUseCaseDto {
  execute(params: DailySlotReconsiderParams): Promise<unknown>
}

export class DailySlotReconsiderUseCase implements DailySlotReconsiderUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(params: DailySlotReconsiderParams): Promise<unknown> {
    const res = await this.endpoint.reconsider(params)
    return res?.data ?? null
  }
}
