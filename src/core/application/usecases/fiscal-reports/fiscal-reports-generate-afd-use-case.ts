import type { AFDFormProps, GenerateAFDParams } from "@/domain/entities/fiscal-reports/AFD";
import { dateToTimeStamp } from "@/domain/global-helpers/time-tools";
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { FiscalReportsEndpoint } from "@/infra/apis/ponto-cloud-client-side/fiscal-reports";

type Response = ResponseDto<WebSocketResponse | null>

export interface GenerateAFDUseCaseDto {
  execute(params: AFDFormProps): Promise<Response>
}

export class FiscalReportsGenerateAFDUseCase implements GenerateAFDUseCaseDto {
  constructor(private readonly endpoint: FiscalReportsEndpoint) { }
  async execute(params: AFDFormProps): Promise<Response> {

    if (!params.periodEnd || !params.periodStart) return {
      success: false,
      data: null
    }

    const body: GenerateAFDParams = {
      ...params,
      periodEnd: dateToTimeStamp(params.periodEnd),
      periodStart: dateToTimeStamp(params.periodStart)
    }

    const { data } = await this.endpoint.generateAFD(body)

    return data ?? null
  }
}
