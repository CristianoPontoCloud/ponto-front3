import type { TimetrackingMonthlyApiParams } from "@/domain/entities/time-tracking/grids/mothly";
import type { TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking";
import type { TimeTrackingFormProps } from "@/domain/entities/time-tracking/header-form";
import type { TimetrackingMonthlyEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking-monthly";

export interface TimetrackingMonthlyCalculateUseCaseDto {
  execute(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
}

export class TimetrackingMonthlyCalculateUseCase implements TimetrackingMonthlyCalculateUseCaseDto {
  constructor(private readonly endpoint: TimetrackingMonthlyEndpoint) { }

  async execute({ companyId, monthlyDate }: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    const [year, month] = monthlyDate.split("-")
    if (!year || !month || companyId === "") return null
    const body: TimetrackingMonthlyApiParams = {
      companyId,
      month,
      year
    }
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
