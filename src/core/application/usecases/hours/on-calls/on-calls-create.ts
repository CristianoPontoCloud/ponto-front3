import type { OnCallDetails, OnCallFormProps } from "@/domain/entities/on-call";
import type { CreateDto } from "@/domain/http/http-client";
import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call";


export interface OnCallsCreatedUseCaseDto {
  execute(body: CreateDto<OnCallFormProps>): Promise<OnCallDetails | null>
}

export class OnCallsCreatedUseCase implements OnCallsCreatedUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }

  async execute(body: CreateDto<OnCallFormProps>): Promise<OnCallDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
