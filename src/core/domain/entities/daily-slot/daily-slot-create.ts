import type { DailySlotKind } from "./daily-slot-shift"

export interface DailySlotCreateBody {
  collaboratorId: string
  date: string
  timeValue: string
  kind: DailySlotKind,
  index: number,
  reason: string
}
