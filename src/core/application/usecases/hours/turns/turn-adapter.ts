import type { TurnDay } from "@/domain/entities/turns/turn-day";
import type { TurnPeriod } from "@/domain/entities/turns/turn-period";
import type { Turn } from "@/domain/entities/turns/turns";
import type { CreateDto, EditDto } from "@/domain/http/http-client";

export class TurnAdapter {
  private periodsOnPost(periods: TurnPeriod[]): TurnPeriod[] {
    const newPeriods: TurnPeriod[] = []
    for (const period of periods) {
      const { endTime, startTime } = period
      if (!endTime || !startTime) continue
      newPeriods.push(period)
    }
    return newPeriods
  }
  private daysOnPost(days: TurnDay[]): TurnDay[] {
    const newDays: TurnDay[] = []
    for (const day of days) {
      const { isOff, periods } = day
      const adaptedPeriods = this.periodsOnPost(periods)
      if (isOff || adaptedPeriods.length === 0) continue
      newDays.push({ ...day, periods: adaptedPeriods })
    }
    return newDays
  }
  public onPost(body: CreateDto<Turn> | EditDto<Turn>): CreateDto<Turn> | EditDto<Turn> {
    return {
      ...body,
      days: this.daysOnPost(body.days)
    }
  }
}
