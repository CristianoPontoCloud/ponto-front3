import type { CollaboratorWithTurnParams } from "../time-tracking/timetraking-collaborator";
import type { DesconsiderMarkFormProps } from "./desconsider-marks";
import type { MarkDetailsFields, MarkEntriesAndOutsRecord, MarkUserColumnsRenderPreference } from "./marks";
import type { MarkDayFlags, MarkSettingIds } from "./settings/mark-setting-ids";


export interface MarkDailyFieldsWithEntries extends MarkEntriesAndOutsRecord, MarkDetailsFields { }

export interface MarkViewDailyData extends Omit<MarkDailyFieldsWithEntries, 'desconsiderMarks'> {
  collaborator: CollaboratorWithTurnParams
  desconsiderMarks: DesconsiderMarkFormProps[]
  dayFlags: MarkDayFlags
  settingIds: MarkSettingIds
}

export interface MarkDailyResponse {
  id: number
  period: number
  timetrackings: MarkViewDailyData[]
  totals: MarkDetailsFields
  columnsToRender: MarkUserColumnsRenderPreference
}


