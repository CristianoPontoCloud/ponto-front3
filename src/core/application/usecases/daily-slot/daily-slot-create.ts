import type { DailySlotCreateBody } from "@/domain/entities/daily-slot/daily-slot-create";
import type { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot";

export interface DailySlotCreateUseCaseDto {
  execute(body: DailySlotCreateBody): Promise<unknown>
}

export class DailySlotCreateUseCase implements DailySlotCreateUseCaseDto {
  constructor(private readonly endpoint: DailySlotEndpoint) { }

  async execute(body: DailySlotCreateBody): Promise<unknown> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
