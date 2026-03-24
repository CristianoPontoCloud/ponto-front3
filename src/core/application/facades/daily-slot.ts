import type { DailySlotIgnoreParams, DailySlotMoveToDateParams, DailySlotReconsiderParams, DailySlotShiftParams, DailySlotUpdateParams } from "@/domain/entities/daily-slot/daily-slot"
import type { DailySlotCreateBody } from "@/domain/entities/daily-slot/daily-slot-create"
import type { DailySlotCreateUseCase } from "../usecases/daily-slot/daily-slot-create"
import type { DailySlotIgnoreUseCase } from "../usecases/daily-slot/daily-slot-ignore"
import type { DailySlotMoveToDateUseCase } from "../usecases/daily-slot/daily-slot-move-to-date"
import type { DailySlotReconsiderUseCase } from "../usecases/daily-slot/daily-slot-reconsider"
import type { DailySlotShiftUseCase } from "../usecases/daily-slot/daily-slot-shift"
import type { DailySlotUpdateUseCase } from "../usecases/daily-slot/daily-slot-update"
interface DailySlotFacadeDto {
  update(params: DailySlotUpdateParams): Promise<unknown>
  ignore(params: DailySlotIgnoreParams): Promise<unknown>
  reconsider(params: DailySlotReconsiderParams): Promise<unknown>
  shift(params: DailySlotShiftParams): Promise<unknown>
  moveToDate(params: DailySlotMoveToDateParams): Promise<unknown>
  create(body: DailySlotCreateBody): Promise<unknown>
}
export class DailySlotFacade implements DailySlotFacadeDto {
  constructor(
    private readonly updateUseCase: DailySlotUpdateUseCase,
    private readonly shiftUseCase: DailySlotShiftUseCase,
    private readonly reconsiderUseCase: DailySlotReconsiderUseCase,
    private readonly ignoreUseCase: DailySlotIgnoreUseCase,
    private readonly moveToDateUseCase: DailySlotMoveToDateUseCase,
    private readonly createUseCase: DailySlotCreateUseCase,
  ) { }
  async update(params: DailySlotUpdateParams): Promise<unknown> {
    return await this.updateUseCase.execute(params)
  }
  async ignore(params: DailySlotIgnoreParams): Promise<unknown> {
    return await this.ignoreUseCase.execute(params)
  }
  async reconsider(params: DailySlotReconsiderParams): Promise<unknown> {
    return await this.reconsiderUseCase.execute(params)
  }
  async shift(params: DailySlotShiftParams): Promise<unknown> {
    return await this.shiftUseCase.execute(params)
  }
  async moveToDate(params: DailySlotMoveToDateParams): Promise<unknown> {
    return await this.moveToDateUseCase.execute(params)
  }
  async create(body: DailySlotCreateBody): Promise<unknown> {
    return await this.createUseCase.execute(body)
  }

}
