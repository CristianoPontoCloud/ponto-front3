import type { DailySlotIgnoreBody } from "./daily-slot-ignore"
import type { DailySlotMoveToDateBody } from "./daily-slot-move-to-date"
import type { DailySlotReconsiderBody } from "./daily-slot-reconsider"
import type { DailySlotShitBody } from "./daily-slot-shift"
import type { DailySlotUpdateBody, DailySlotUpdateMinimalBody } from "./daily-slot-update"

export type DailySlotKind = "ENTRY" | "OUT"
export enum DailySlotUpdate {
  INCLUSION = "I",
  PRE_MARKED = "P",
  EXCLUSION = "X",
  TIME_ADJUSTMENT = "T",
}

interface DailySlotDto<T> {
  slotId: string
  body: Partial<T>
}

export type DailySlotUpdateParams = DailySlotDto<DailySlotUpdateBody | DailySlotUpdateMinimalBody>
export type DailySlotIgnoreParams = DailySlotDto<DailySlotIgnoreBody>
export type DailySlotReconsiderParams = DailySlotDto<
  DailySlotReconsiderBody
>
export interface DailySlotShiftParams extends DailySlotDto<DailySlotShitBody> {
  date: string
}

export type DailySlotMoveToDateParams = DailySlotDto<DailySlotMoveToDateBody>;
