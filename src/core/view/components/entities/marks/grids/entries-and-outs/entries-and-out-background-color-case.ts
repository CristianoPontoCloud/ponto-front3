import { MarkStatusEnum } from "@/domain/entities/marks/marks";

export function entriesAndOutsGetBg(status?: MarkStatusEnum) {
  const {
    dayoff,
    dent,
    manual,
    med,
    missing,
    normal,
  } = MarkStatusEnum
  const colors = {
    [normal]: "bg-[rgba(128,128,128,0.1)]",
    [manual]: "bg-yellow-50 dark:bg-yellow-900/10",
    [missing]: "bg-red-50 dark:bg-red-900/10",
    [med]: "bg-blue-50 dark:bg-blue-900/10",
    [dent]: "bg-blue-50 dark:bg-blue-900/10",
    [dayoff]: "bg-blue-50 dark:bg-blue-900/10",
  };
  return colors[status ?? MarkStatusEnum.normal];
}
