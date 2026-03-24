import type { TimetrackingApisResponse } from "@/domain/entities/time-tracking/grids/timetracking"
import type { TimeTrackingFormProps } from "@/domain/entities/time-tracking/header-form"
import type { TimetrackingCalculateUseCase } from "../usecases/timetracking/timatracking-calculate"
import type { TimetrackingDailyCalculateUseCase } from "../usecases/timetracking/timatracking-daily-calculate"
import type { TimetrackingMonthlyCalculateUseCase } from "../usecases/timetracking/timatracking-monthly-calculate"

interface TimetrackingFacadeDto {
  calculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
  dailyCalculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
  monthlyCalculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null>
}

export class TimetrackingFacade implements TimetrackingFacadeDto {
  constructor(
    private readonly calculateUseCase: TimetrackingCalculateUseCase,
    private readonly dailyCalculateUseCase: TimetrackingDailyCalculateUseCase,
    private readonly monthlyCalculateUseCase: TimetrackingMonthlyCalculateUseCase,
  ) { }
  async calculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    return await this.calculateUseCase.execute(params)
  }
  async dailyCalculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    return await this.dailyCalculateUseCase.execute(params)
  }
  async monthlyCalculate(params: TimeTrackingFormProps): Promise<TimetrackingApisResponse | null> {
    return await this.monthlyCalculateUseCase.execute(params)
  }
}
