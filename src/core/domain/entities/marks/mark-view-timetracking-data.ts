import type { CollaboratorWithTurnParams } from "../time-tracking/timetraking-collaborator";
import type { DesconsiderMarkFormProps } from "./desconsider-marks";
import type { MarkDetailsFields, MarkEntriesAndOutsRecord, MarkUserColumnsRenderPreference } from "./marks";
import type { MarkDayFlags, MarkSettingIds } from "./settings/mark-setting-ids";


export interface MarkTimetrackingFieldsWithEntries extends MarkEntriesAndOutsRecord, MarkDetailsFields { }

export interface MarkViewTimetrackingData extends Omit<MarkTimetrackingFieldsWithEntries, 'desconsiderMarks'> {
  dayMonth: string
  dayWeek: string
  collaborator: CollaboratorWithTurnParams
  desconsiderMarks: DesconsiderMarkFormProps[]
  dayFlags: MarkDayFlags
  turn: {
    cycleLengthDays?: number
    id?: string
    name?: string
    patternType?: string
    timeRanges?: string
  }
  settingIds: MarkSettingIds
}

export interface MarkTimetrackingResponse {
  id: number
  period: number
  timetrackings: MarkViewTimetrackingData[]
  totals: MarkDetailsFields
  columnsToRender: MarkUserColumnsRenderPreference
}


