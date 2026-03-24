import type { TimetrackingApiParams, TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking";
import type { TimeTrackingFormProps } from "@/domain/entities/time-tracking/header-form";
import type { TimetrackingEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking";

export interface TimetrackingCalculateUseCaseDto {
  execute(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
}

export class TimetrackingCalculateUseCase implements TimetrackingCalculateUseCaseDto {
  constructor(private readonly endpoint: TimetrackingEndpoint) { }

  async execute({ collaboratorId, companyId, dateFrom, dateTo }: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    if (companyId === "" || collaboratorId === "" || !dateFrom || !dateTo) return null
    const body: TimetrackingApiParams = {
      collaboratorId,
      companyId,
      fromISODateTime: dateFrom,
      toISODateTime: new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate())
      // toISODateTime: new Date(Date.UTC(dateTo.getFullYear(), dateTo.getMonth() + 1, dateTo.getDay(), dateTo.getHours(), dateTo.getMinutes(), dateTo.getSeconds()))
    }
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
