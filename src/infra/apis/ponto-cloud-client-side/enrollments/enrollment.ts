import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"


export interface EnrollmentEndPointDto {
  post<Params, Response>(params: Params): Promise<AxiosResponse<Response | null>>
}

export class EnrollmentEndpoint implements EnrollmentEndPointDto {
  private readonly url: string
  constructor(
    private readonly client: HttpClient,
    private readonly subUrl: `/${string}`
  ) {
    this.url = `enrollment${this.subUrl}`
  }
  async post<Params, Response>(params: Params): Promise<AxiosResponse<Response | null>> {
    return await this.client.post<Params, Response>({
      url: this.url,
      body: params,
    })
  }
}
