import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"


export interface LocalEndpointDto {
  dowloadFile(body: { fileUrl: string }): Promise<AxiosResponse<Blob>>
}
export class LocalEndpoint implements LocalEndpointDto {
  constructor(private readonly client: HttpClient) { }
  // private readonly endpoint = 'dowloads'

  async dowloadFile(body: { fileUrl: string }): Promise<AxiosResponse<Blob>> {
    return (await this.client.post<{ fileUrl: string }, Blob>({ url: "downloads", body, config: { responseType: "blob" }, }))
  }
}
