import type { MirrorMark, MirrorMarkGenerateParams } from "@/domain/entities/mirror-mark/mirror-mark"
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<MirrorMark[]>
type SocketMetadateResponse = ResponseDto<WebSocketResponse>
// type CreateRequest = CreateDto<RequestFormProps>
// type EditRequest = EditDto<RequestFormProps>

interface MirrorMarkEndPointDto {
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  generate(body: MirrorMarkGenerateParams): Promise<AxiosResponse<SocketMetadateResponse>>
}

export class MirrorMarkEndpoint implements MirrorMarkEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly restApiEndpoint = "espelhos";
  private readonly generateWebsocketEndpoint = "generate-espelho";
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.restApiEndpoint}/competencias${urlParams ?? ""}`)
  }
  async generate(body: MirrorMarkGenerateParams): Promise<AxiosResponse<SocketMetadateResponse>> {
    return this.client.post<MirrorMarkGenerateParams, SocketMetadateResponse>({ url: this.generateWebsocketEndpoint, body })
  }
}
