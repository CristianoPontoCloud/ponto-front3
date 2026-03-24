import type { MarkTypeEnum } from "../marks/mark-type"
import type { TimeRegistersDto } from "../time-registers"

export interface Receipts extends TimeRegistersDto {
  id: string
  date: Date
  typeMark: MarkTypeEnum
  urlDownload: string
}

export enum ReceiptsGenerateModeEnum {
  PADRAO = "PADRAO",
  ECONOMICO = "ECONOMICO",
}

export interface ReceiptsGenerate {
  companyId: string;
  collaboratorId?: string;
  from: string;
  to: string;
  mode: ReceiptsGenerateModeEnum;
}
