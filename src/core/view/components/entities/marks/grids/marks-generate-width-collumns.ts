import type { MarkViewDailyData } from "@/domain/entities/marks/mark-view-daily-data";

export function marksGenerateCollumnWidth(
  marks: MarkViewDailyData[]
) {
  const settingsWidth = 40;
  const hourWidth = 66;
  const entriesWidth = 55;
  const collaboratorMinWidth = 187;
  const desconsiderMarkWidth = Math.max(...marks.map((arr) => arr.desconsiderMarks?.length ?? 0)) * 56;
  const dayMonthWidth = 90;
  const dayWeekWidth = 94;
  return {
    settingsWidth,
    hourWidth,
    entriesWidth,
    collaboratorMinWidth,
    desconsiderMarkWidth,
    dayMonthWidth,
    dayWeekWidth
  }
}
