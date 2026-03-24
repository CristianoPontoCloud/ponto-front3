import type { DailySlotKind } from "./daily-slot-shift"

export interface DailySlotMoveToDateBody {
  targetDate: string,
  targetKind: DailySlotKind,
  targetIndex: number,
  reason: string
}
