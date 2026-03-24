export interface MarkSettingIds {
  idTurnEdit?: string
  idHourBank?: string
  idHoliday?: string
  idDayoff?: string
  idRequest?: string
}

export interface DayFlag {
  hasRecords: boolean
}

export interface MarkDayFlags {
  extraTime: DayFlag
  holiday: DayFlag
  requests: DayFlag
  workshiftAdjustments: DayFlag
  dayOff: DayFlag
}
