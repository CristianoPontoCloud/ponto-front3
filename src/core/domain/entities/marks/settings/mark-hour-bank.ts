import type { TimeRegistersDto } from "../../time-registers"

export enum MarkHourBankEntryTypeEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface MarkHourBankEntry {
  type: MarkHourBankEntryTypeEnum
  hourBankId: string
  date: string
  collaboratorId: string
  minutes: string
  reason?: string
}

export interface MarkHourBankEntryDetails extends MarkHourBankEntry, TimeRegistersDto {
  id: string
}

export interface MarkHourBankEntryFormProps extends MarkHourBankEntry {
  id?: string
}

export interface MarkHourBankEntryBulkFormProps {
  entries: MarkHourBankEntryFormProps[]
}
