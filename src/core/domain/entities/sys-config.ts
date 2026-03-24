import type { ValueLabel } from "@/domain/value-label"

export interface KeyCodeValue {
  key: string,
  code: number,
  value: string
}
export interface SysConfigParameters {
  yesNo: KeyCodeValue[]
  dsrTiming: KeyCodeValue[]
  workingMode: KeyCodeValue[]
  compensationMode: KeyCodeValue[]
  extendedNightlyShift: KeyCodeValue[]
  extraTimeUnderAnHour: KeyCodeValue[]
  dsrHolidayDiscounting: KeyCodeValue[]
  extraHourCalculationMode: KeyCodeValue[]
  actionUponSurpassingLimit: KeyCodeValue[]
  deducingFromExtraTimeMode: KeyCodeValue[]
  dsrDiscounting: KeyCodeValue[]
  sundaysAndHolidaysOnTurnOfDay: KeyCodeValue[]
  maximumDSRAbsences: string
  absenceToleranceInMinutes: string
  punchingToleranceInMinutes: string
  dailyMinimumAbsentInMinutes: string
  dailyMinimumExtraHoursInMinutes: string
  nightlyFactor: string
  nightlyShiftEndTime: string
  nightlyShiftStartTime: string
  minimumInterval: string
  considerCLT58Art: boolean
  extraHoursAppliedRate: ValueLabel
  dsrTime: string
}


