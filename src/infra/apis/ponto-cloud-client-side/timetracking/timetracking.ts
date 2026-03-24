import type { TimetrackingApiParams, TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface TimetrackingEndPointDto {
  create(body: TimetrackingApiParams): Promise<AxiosResponse<TimetrackingApisResponse>>
}

export class TimetrackingEndpoint implements TimetrackingEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'calculate-estimates'

  async create(body: TimetrackingApiParams): Promise<AxiosResponse<TimetrackingApisResponse>> {
    return await this.client.post<TimetrackingApiParams, TimetrackingApisResponse>({ body, url: this.endpoint })
  }

}
