import type { AEJFormProps, GenerateAEJParams } from "@/domain/entities/fiscal-reports/AEJ";
import { dateToTimeStamp } from "@/domain/global-helpers/time-tools";
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { FiscalReportsEndpoint } from "@/infra/apis/ponto-cloud-client-side/fiscal-reports";

type Response = ResponseDto<WebSocketResponse | null>

export interface GenerateAEJUseCaseDto {
  execute(params: AEJFormProps): Promise<Response>
}

export class FiscalReportsGenerateAEJUseCase implements GenerateAEJUseCaseDto {
  constructor(private readonly endpoint: FiscalReportsEndpoint) { }
  async execute(params: AEJFormProps): Promise<Response> {

    if (!params.periodEnd || !params.periodStart) return {
      success: false,
      data: null
    }

    const body: GenerateAEJParams = {
      ...params,
      periodEnd: dateToTimeStamp(params.periodEnd),
      periodStart: dateToTimeStamp(params.periodStart)
    }

    const { data } = await this.endpoint.generateAEJ(body)

    return data ?? null
  }
}
