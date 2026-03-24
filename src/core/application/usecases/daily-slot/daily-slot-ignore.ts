import type { DailySlotIgnoreParams } from "@/domain/entities/daily-slot/daily-slot";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotIgnoreUseCaseDto {
  execute(params: DailySlotIgnoreParams): Promise<unknown>
}

export class DailySlotIgnoreUseCase implements DailySlotIgnoreUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(params: DailySlotIgnoreParams): Promise<unknown> {
    const res = await this.endpoint.ignore(params)
    return res?.data ?? null
  }
}
