import type { MirrorMarkGenerate } from "@/domain/entities/mirror-mark/mirror-mark";
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { MirrorMarkEndpoint } from "@/infra/apis/ponto-cloud-client-side/mirror-mark";

type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>

export interface MirrorMarkGenerateUseCaseDto {
  execute(body: MirrorMarkGenerate): Promise<SocketMetadateResponse>
}

export class MirrorMarkGenerateUseCase implements MirrorMarkGenerateUseCaseDto {
  constructor(private readonly endpoint: MirrorMarkEndpoint) { }
  async execute(body: MirrorMarkGenerate): Promise<SocketMetadateResponse> {
    const { data } = await this.endpoint.generate(body)
    return data ?? null
  }
}
