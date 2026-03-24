import type { PunchFormProps, PunchResponse } from "@/domain/entities/punch"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"



interface PunchClockEndPointDto {
  punch(body: PunchFormProps): Promise<AxiosResponse<PunchResponse>>
}

export class PunchClockEndpoint implements PunchClockEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'punch'

  async punch(body: PunchFormProps): Promise<AxiosResponse<PunchResponse>> {
    return await this.client.post<PunchFormProps, PunchResponse>({ url: this.endpoint, body })
  }
}
