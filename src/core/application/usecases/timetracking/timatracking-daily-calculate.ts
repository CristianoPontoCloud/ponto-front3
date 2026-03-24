import type { TimetrackingDailyApiParams } from "@/domain/entities/time-tracking/grids/daily";
import type { TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking";
import type { TimeTrackingFormProps } from "@/domain/entities/time-tracking/header-form";
import type { TimetrackingDailyEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking-daily";
import { format } from "date-fns-tz";

export interface TimetrackingDailyCalculateUseCaseDto {
  execute(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
}

export class TimetrackingDailyCalculateUseCase implements TimetrackingDailyCalculateUseCaseDto {
  constructor(private readonly endpoint: TimetrackingDailyEndpoint) { }

  async execute({ companyId, dailyDate, collaboratorId }: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (dailyDate === null || companyId === "") return null
    const date = format(dailyDate, "yyyy-MM-dd'T'HH:mm:ssXXX", {
      timeZone,
    });
    const body: TimetrackingDailyApiParams = {
      collaboratorId,
      companyId,
      date
    }

    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
