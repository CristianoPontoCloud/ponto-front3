import type { TimeRegistersDto } from "../time-registers"
import type { ExportEvent } from "./exports-events"
import type { ExportFields } from "./exports-fields"

export interface ExportLayout extends TimeRegistersDto {
  id: string
  name: string
  lastModify: {
    date: Date
    time: string
    user: string
  }
  downloadUrl: string
  footer: string
  header: string
  separatedFields: string
  separatedDecimal: string
  reportType: string
  hourFormated: string
  extraFactor: boolean
  nightFactor: boolean
  fields: ExportFields[]
  events: ExportEvent[]
  companyId: string
}




export interface ExportLayoutFormProps extends Omit<ExportLayout, 'id' | 'createdAt' | 'deletedBy' | 'deletedAt' | 'updatedAt' | 'lastModify' | 'downloadUrl'> {
  id?: string
}

export enum ExportTabEnum {
  FIELDS = "fields",
  EVENTS = "events",
}


export interface ExportDownloadFormProps {
  exportLayoutId: string
  dateFrom: Date | null
  dateTo: Date | null
  collaboratorIds: string[]
  positionIds: string[]
  costCenterIds: string[]
  turnIds: string[]
  departmentIds: string[]
}
