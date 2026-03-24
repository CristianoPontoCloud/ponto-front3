export type DailySlotKind = "ENTRY" | "OUT"
export type PairDailyType = "move" | "clear"
export interface DailySlot {
  kind: DailySlotKind
  index: number
}
export interface PairDailySlot {
  type: PairDailyType
  from?: DailySlot
  to: DailySlot
}
export interface ClearDailySlot {
  clear: DailySlot
}
export interface DailySlotShitBody {
  ops: Array<PairDailySlot | ClearDailySlot>,
  reason: string
}
