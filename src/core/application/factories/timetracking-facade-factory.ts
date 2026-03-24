import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { TimetrackingEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking"
import { TimetrackingDailyEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking-daily"
import { TimetrackingMonthlyEndpoint } from "@/infra/apis/ponto-cloud-client-side/timetracking/timetracking-monthly"
import { TimetrackingFacade } from "../facades/timetracking-facade"
import { TimetrackingCalculateUseCase } from "../usecases/timetracking/timatracking-calculate"
import { TimetrackingDailyCalculateUseCase } from "../usecases/timetracking/timatracking-daily-calculate"
import { TimetrackingMonthlyCalculateUseCase } from "../usecases/timetracking/timatracking-monthly-calculate"

export function timetrackingFacadeFactory(token: string): TimetrackingFacade {
  const pontoCloudApi = createPontoCloudApi(token)

  const endpoint = new TimetrackingEndpoint(pontoCloudApi)
  const dailyEndpoint = new TimetrackingDailyEndpoint(pontoCloudApi)
  const monthlyEndpoint = new TimetrackingMonthlyEndpoint(pontoCloudApi)

  const calculate = new TimetrackingCalculateUseCase(endpoint)
  const dailyCalculate = new TimetrackingDailyCalculateUseCase(dailyEndpoint)
  const monthlyCalculate = new TimetrackingMonthlyCalculateUseCase(monthlyEndpoint)

  return new TimetrackingFacade(calculate, dailyCalculate, monthlyCalculate)
}
