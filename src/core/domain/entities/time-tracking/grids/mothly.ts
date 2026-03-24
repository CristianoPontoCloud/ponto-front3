import type { CollaboratorWithTurnParams } from "../timetraking-collaborator"

export interface TimetrackingMonthlyResponse {
  id: number
  collaborator: CollaboratorWithTurnParams
  nrOccurrence: number
  nrRequests: number
  missingHours: string
  extraHours: string
  balanceBank: string
  totalHours: string
}

export interface TimetrackingMonthlyApiParams {
  companyId: string
  year: string
  month: string
}
