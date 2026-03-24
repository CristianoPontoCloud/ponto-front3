import type { ValueLabel } from "@/domain/value-label"

export interface MarkRequestParams {
  type: string
  date: Date | null
  hour: string
  dtStart: Date | null
  dtEnd: Date | null
  hrStart: string
  hrEnd: string
  justify: string
}

export interface MarkRequestFormProps {
  requests: MarkRequestParams[]
}

export enum MarkRequestTypeEnum {
  emergency = '1',
  doctor = '2'
}

export const MarkRequestsMap: ValueLabel[] = [
  { value: '1', label: 'Emergência' },
  { value: '2', label: 'Médico' }
]
