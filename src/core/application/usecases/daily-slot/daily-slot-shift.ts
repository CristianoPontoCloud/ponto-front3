import type { DailySlotShiftParams } from "@/domain/entities/daily-slot/daily-slot";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotShiftUseCaseDto {
  execute(params: DailySlotShiftParams): Promise<unknown>
}

export class DailySlotShiftUseCase implements DailySlotShiftUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(params: DailySlotShiftParams): Promise<unknown> {
    const res = await this.endpoint.shift(params)
    return res?.data ?? null
  }
}
