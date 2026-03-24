import type { DailySlotMoveToDateParams } from "@/domain/entities/daily-slot/daily-slot";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotMoveToDateUseCaseDto {
  execute(params: DailySlotMoveToDateParams): Promise<unknown>
}

export class DailySlotMoveToDateUseCase implements DailySlotMoveToDateUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(params: DailySlotMoveToDateParams): Promise<unknown> {
    const res = await this.endpoint.moveToDate(params)
    return res?.data ?? null
  }
}
