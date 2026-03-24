import type { TimetrackingMonthlyApiParams } from "@/domain/entities/time-tracking/grids/mothly"
import type { TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface TimetrackingMonthlyEndPointDto {
  create(body: TimetrackingMonthlyApiParams): Promise<AxiosResponse<TimetrackingApisResponse>>
}

export class TimetrackingMonthlyEndpoint implements TimetrackingMonthlyEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'calculate-monthly-hours'

  async create(body: TimetrackingMonthlyApiParams): Promise<AxiosResponse<TimetrackingApisResponse>> {
    return await this.client.post<TimetrackingMonthlyApiParams, TimetrackingApisResponse>({ body, url: this.endpoint })
  }

}
