import type { MirrorMarkGenerateParams } from "@/domain/entities/mirror-mark/mirror-mark";
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { MirrorMarkEndpoint } from "@/infra/apis/ponto-cloud-client-side/mirror-mark";

type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>

export interface MirrorMarkGenerateParamsUseCaseDto {
  execute(body: MirrorMarkGenerateParams): Promise<SocketMetadateResponse>
}

export class MirrorMarkGenerateParamsUseCase implements MirrorMarkGenerateParamsUseCaseDto {
  constructor(private readonly endpoint: MirrorMarkEndpoint) { }
  async execute(body: MirrorMarkGenerateParams): Promise<SocketMetadateResponse> {
    const { data } = await this.endpoint.generate(body)
    return data ?? null
  }
}
