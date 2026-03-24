enum DailySlotUpdate {
  INCLUSION = "I",
  PRE_MARKED = "P",
  EXCLUSION = "X",
  TIME_ADJUSTMENT = "T",
}

export interface DailySlotUpdateBody {
  value: string
  reason: string
  sourceCode: DailySlotUpdate
}

export type DailySlotUpdateMinimalBody = Pick<DailySlotUpdateBody, "value">
