import type { ValueLabel } from "@/domain/value-label"

export enum TimeTrackingTypeEnum {
  daily = 'DAILY',
  monthly = 'MONTHLY',
  timetracking = 'TIMETRACKING'
}

export const timeTrackingTypeList: ValueLabel[] = [
  { label: 'Resumo mensal', value: TimeTrackingTypeEnum.monthly },
  { label: 'Ponto diário', value: TimeTrackingTypeEnum.daily },
  { label: 'Apuração', value: TimeTrackingTypeEnum.timetracking },
]

export interface TimeTrackingFormProps {
  companyId: string
  type: TimeTrackingTypeEnum
  collaboratorId: string
  search: string
  dailyDate: Date | null
  monthlyDate: string
  dateFrom?: Date | null
  dateTo?: Date | null
}

