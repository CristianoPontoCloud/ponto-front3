import type { TimetrackingDailyApiParams } from "@/domain/entities/time-tracking/grids/daily"
import type { TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface TimetrackingDailyEndPointDto {
  create(body: TimetrackingDailyApiParams): Promise<AxiosResponse<TimetrackingApisResponse>>
}

export class TimetrackingDailyEndpoint implements TimetrackingDailyEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'calculate-daily-hours'

  async create(body: TimetrackingDailyApiParams): Promise<AxiosResponse<TimetrackingApisResponse>> {
    return await this.client.post<TimetrackingDailyApiParams, TimetrackingApisResponse>({ body, url: this.endpoint })
  }

}
