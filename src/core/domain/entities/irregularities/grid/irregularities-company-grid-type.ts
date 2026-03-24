import type { DesconsiderMarkFormProps } from "../../marks/desconsider-marks"
import type { MarkViewTimetrackingData } from "../../marks/mark-view-timetracking-data"
import type { MarkDetailsFields } from "../../marks/marks"
import type { MarkSettingIds } from "../../marks/settings/mark-setting-ids"
import type { CollaboratorWithTurnParams } from "../../time-tracking/timetraking-collaborator"
import type { IrregularitiesFields, IrregularitiesFieldsWithEntries, IrregularitiesUserColumnsRenderPreference } from "./irregularities-grid-types"

export interface IrregularitiesHourManager extends Omit<IrregularitiesFieldsWithEntries, 'desconsiderMarks'> {
  dayMonth: string
  dayWeek: string
  collaborator: CollaboratorWithTurnParams
  desconsiderMarks: DesconsiderMarkFormProps[]
  settingIds: MarkSettingIds
}

export type IrregularitiesTotals = IrregularitiesFields

export interface IrregularitiesResponse {
  id: string
  period: number
  irregularities: MarkViewTimetrackingData[]
  totals: MarkDetailsFields
  columnsToRender: IrregularitiesUserColumnsRenderPreference
}

export interface IrregularitiesApiParams {
  companyId: string,
  collaboratorId: string,
  date: string
}
