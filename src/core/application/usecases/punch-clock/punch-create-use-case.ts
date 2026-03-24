import type { PunchFormProps, PunchResponse } from "@/domain/entities/punch";
import type { PunchClockEndpoint } from "@/infra/apis/ponto-cloud-client-side/punch-clock/punch";

export interface PunchCreateUseCaseDto {
  execute(body: PunchFormProps): Promise<PunchResponse | null>
}

export class PunchCreateUseCase implements PunchCreateUseCaseDto {
  constructor(
    private readonly endpoint: PunchClockEndpoint,
  ) { }

  async execute(body: PunchFormProps): Promise<PunchResponse | null> {
    const res = await this.endpoint.punch(body)
    return res?.data ?? null
  }
}
