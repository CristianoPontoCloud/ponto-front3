import type { MarkHourBankEntryDetails } from "@/domain/entities/marks/settings/mark-hour-bank";

export class HourBankEntryAdapter {
  public adaptEntryOnGet(entry: MarkHourBankEntryDetails): MarkHourBankEntryDetails {
    return {
      ...entry,
      minutes: this.parseMinutesToHours(entry.minutes)
    }
  }
  public adaptEntryOnPost(entry: MarkHourBankEntryDetails): MarkHourBankEntryDetails {
    return {
      ...entry,
      minutes: this.parseHoursToMinutes(entry.minutes)
    }
  }
  public adaptEntriesOnGet(entries: MarkHourBankEntryDetails[]): MarkHourBankEntryDetails[] {
    return entries.map((entry) => (this.adaptEntryOnGet(entry)))
  }
  public adaptEntriesOnPost(entries: MarkHourBankEntryDetails[]): MarkHourBankEntryDetails[] {
    return entries.map((entry) => (this.adaptEntryOnPost(entry)))
  }

  private parseMinutesToHours(minutes: string | number): string {
    const totalMinutes = Number(minutes)

    const hours = Math.floor(totalMinutes / 60)
    const mins = Math.floor(totalMinutes % 60)

    const hh = String(hours).padStart(2, '0')
    const mm = String(mins).padStart(2, '0')

    return `${hh}:${mm}`
  }
  private parseHoursToMinutes(time: string): string {
    const [hours, minutes] = time.split(':').map(Number)
    return `${hours * 60 + minutes}`
  }
}
