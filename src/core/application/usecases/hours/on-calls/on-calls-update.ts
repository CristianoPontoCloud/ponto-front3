import type { OnCallDetails, OnCallFormProps } from "@/domain/entities/on-call";
import type { EditDto } from "@/domain/http/http-client";
import type { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call";

export interface OnCallsUpdateUseCaseDto {
  execute(body: EditDto<OnCallFormProps>): Promise<OnCallDetails | null>
}

export class OnCallsUpdateUseCase implements OnCallsUpdateUseCaseDto {
  constructor(private readonly endpoint: OnCallsEndpoint) { }

  async execute(body: EditDto<OnCallFormProps>): Promise<OnCallDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
