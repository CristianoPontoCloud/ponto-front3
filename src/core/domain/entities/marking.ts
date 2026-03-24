import type { TimeRegistersDto } from "./time-registers";

export interface Marking extends TimeRegistersDto {
  id: string,
  companyTimeZone: string,
  date: string,
  time: string,
  valid: boolean,
  ip: string | null,
  macAddress: string,
  origin: string,
  type: string,
  reason: string | null,
  collaborator: string,
  equipment: string
}

export interface MarkingFormProps extends Omit<Marking, 'id'> {
  id?: string,
}
