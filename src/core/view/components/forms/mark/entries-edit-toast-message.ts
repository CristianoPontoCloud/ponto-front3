import type { EntryAndOutKey } from "@/domain/entities/marks/marks"
import { getEntriesKey } from "@/domain/entities/time-tracking/get-entries-key"
import { formatDate } from "date-fns/format"

interface entriesEditToastMessageParams {
  hour: string
  key: EntryAndOutKey
  name: string
}

export function entriesEditToastMessage({ hour, key, name }: entriesEditToastMessageParams): string {
  return `${name} - ${formatDate(new Date(), 'dd/MM/yyyy')} (${getEntriesKey(key)} - ${hour})`
}
