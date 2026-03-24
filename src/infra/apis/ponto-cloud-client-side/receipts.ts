import type { Receipts, ReceiptsGenerate } from "@/domain/entities/receipts/receipts"
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Receipts[]>
type SocketMetadateResponse = ResponseDto<WebSocketResponse>

interface ReceiptsEndPointDto {
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  generate(body: ReceiptsGenerate): Promise<AxiosResponse<SocketMetadateResponse>>
}

export class ReceiptsEndpoint implements ReceiptsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'generate-comprovante'
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async generate(body: ReceiptsGenerate): Promise<AxiosResponse<SocketMetadateResponse>> {
    return this.client.post<ReceiptsGenerate, SocketMetadateResponse>({ url: this.endpoint, body })
  }
}
