import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { DailySlotEndpoint } from "@/infra/apis/ponto-cloud-client-side/daily-slot"
import { DailySlotFacade } from "../facades/daily-slot"
import { DailySlotCreateUseCase } from "../usecases/daily-slot/daily-slot-create"
import { DailySlotIgnoreUseCase } from "../usecases/daily-slot/daily-slot-ignore"
import { DailySlotMoveToDateUseCase } from "../usecases/daily-slot/daily-slot-move-to-date"
import { DailySlotReconsiderUseCase } from "../usecases/daily-slot/daily-slot-reconsider"
import { DailySlotShiftUseCase } from "../usecases/daily-slot/daily-slot-shift"
import { DailySlotUpdateUseCase } from "../usecases/daily-slot/daily-slot-update"

export function dailySlotFacadeFactory(token: string): DailySlotFacade {
  const endpoint = new DailySlotEndpoint(createPontoCloudApi(token))
  const updateUseCase = new DailySlotUpdateUseCase(endpoint)
  const shiftUseCase = new DailySlotShiftUseCase(endpoint)
  const reconsiderUseCase = new DailySlotReconsiderUseCase(endpoint)
  const ignoreUseCase = new DailySlotIgnoreUseCase(endpoint)
  const moveToDateUseCase = new DailySlotMoveToDateUseCase(endpoint)
  const createUseCase = new DailySlotCreateUseCase(endpoint)

  return new DailySlotFacade(
    updateUseCase,
    shiftUseCase,
    reconsiderUseCase,
    ignoreUseCase,
    moveToDateUseCase,
    createUseCase
  )
}
