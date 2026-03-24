import type { EntryAndOutKey } from "./marks"

export interface MarkFormProps {
  date: Date
  hour: string
  justify: string
  entryKey: EntryAndOutKey
  collaborator: {
    id: string
    name: string
    position: string
  }
}

// export interface DesconsiderMarkFormProps {
//   date: string
//   id: string
//   punchClockId: string
//   reason: string
//   time: string
// }
export interface DesconsiderMarkFormProps {
  date: string
  entryKey: EntryAndOutKey
  hour: string
  idMark: string
  justify: string
  responsible: string
}

// export interface TimetrackingDesconsiderMarkFormProps extends MarkFormProps {
//   idMark: number
// }
