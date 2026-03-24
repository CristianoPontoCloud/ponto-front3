import type { TimetrackingGridSettingIconCellParams } from "../settings-cell";

export interface useSettingCellActionParams extends Omit<TimetrackingGridSettingIconCellParams, "date"> {
  timestampDate?: string
  date: Date
}
