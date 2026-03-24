import type { DailySlotUpdateParams } from "@/domain/entities/daily-slot/daily-slot";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotUpdateUseCaseDto {
  execute(params: DailySlotUpdateParams): Promise<unknown>
}

export class DailySlotUpdateUseCase implements DailySlotUpdateUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(params: DailySlotUpdateParams): Promise<unknown> {
    const res = await this.endpoint.update(params)
    return res?.data ?? null
  }
}
