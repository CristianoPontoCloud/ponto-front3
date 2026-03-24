import type { DayFlag, MarkDayFlags } from "@/domain/entities/marks/settings/mark-setting-ids";
import { tv } from "tailwind-variants";

export function markGetBgsettingIds(dayFlags?: MarkDayFlags) {
  const hasId = Object.values(dayFlags ?? {}).some(({ hasRecords }: DayFlag) => hasRecords !== null);
  const bgSettings = tv({
    variants: {
      hasId: {
        true: "bg-blue-50 dark:bg-blue-900/10",
        fals: "",
      },
    },
  });
  return bgSettings({ hasId })
}
