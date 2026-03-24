import type { EntriesAndOutsRecord } from "../turns/turns"

export interface CollaboratorWithTurnParams {
  id: string
  name: string
  email: string
  position: string
  sector: string
  lastMark: {
    hour: string
    date: string
  }
  turn: EntriesAndOutsRecord
}
