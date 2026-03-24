import type { MirrorMark, MirrorMarkGenerate } from "@/domain/entities/mirror-mark/mirror-mark"
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
  generate(body: MirrorMarkGenerate): Promise<AxiosResponse<SocketMetadateResponse>>
}

export class MirrorMarkEndpoint implements MirrorMarkEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'generate-espelho'
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async generate(body: MirrorMarkGenerate): Promise<AxiosResponse<SocketMetadateResponse>> {
    return this.client.post<MirrorMarkGenerate, SocketMetadateResponse>({ url: this.endpoint, body })
  }
}
