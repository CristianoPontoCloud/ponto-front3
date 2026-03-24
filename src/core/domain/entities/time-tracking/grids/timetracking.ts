import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client"

export interface TimetrackingApiParams {
  companyId: string
  collaboratorId: string
  fromISODateTime: Date
  toISODateTime: Date
}

export type TimetrackingApisResponse = ResponseDto<WebSocketResponse>
