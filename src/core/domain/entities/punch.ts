import type { ResponseDto } from "../http/http-client";

export interface PunchFormProps {
  collaboratorId: string
  date: string
  time: string
  timestamp: string
  companyId: string
  companyTimeZone: string
  type: "01"
  origin: "02"
  collectorId: string
}

export type PunchType = "simple" | "PIN"

export type PunchResponse = ResponseDto<{ message: string }>
