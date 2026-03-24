import type { ReceiptsGenerate } from "@/domain/entities/receipts/receipts";
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { ReceiptsEndpoint } from "@/infra/apis/ponto-cloud-client-side/receipts";

type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>

export interface ReceiptsGenerateUseCaseDto {
  execute(body: ReceiptsGenerate): Promise<SocketMetadateResponse>
}

export class ReceiptsGenerateUseCase implements ReceiptsGenerateUseCaseDto {
  constructor(private readonly endpoint: ReceiptsEndpoint) { }
  async execute(body: ReceiptsGenerate): Promise<SocketMetadateResponse> {
    const { data } = await this.endpoint.generate(body)
    return data ?? null
  }
}
