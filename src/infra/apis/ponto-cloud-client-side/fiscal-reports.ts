import type { GenerateAEJParams } from "@/domain/entities/fiscal-reports/AEJ"
import type { GenerateAFDParams } from "@/domain/entities/fiscal-reports/AFD"
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"




interface FiscalReportsEndPointDto {
  generateAFD(body: GenerateAFDParams): Promise<AxiosResponse<ResponseDto<WebSocketResponse>>>
  generateAEJ(body: GenerateAEJParams): Promise<AxiosResponse<ResponseDto<WebSocketResponse>>>
}

export class FiscalReportsEndpoint implements FiscalReportsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'generate-'

  async generateAFD(body: GenerateAFDParams): Promise<AxiosResponse<ResponseDto<WebSocketResponse>>> {
    return await this.client.post<GenerateAFDParams, ResponseDto<WebSocketResponse>>({
      url: `${this.endpoint}afd`,
      body,
    })
  }
  async generateAEJ(body: GenerateAEJParams): Promise<AxiosResponse<ResponseDto<WebSocketResponse>>> {
    return await this.client.post<GenerateAEJParams, ResponseDto<WebSocketResponse>>({
      url: `${this.endpoint}aej`,
      body,
    })
  }
}
