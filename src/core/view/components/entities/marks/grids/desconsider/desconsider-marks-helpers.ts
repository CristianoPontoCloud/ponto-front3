import type { MarkViewDailyData } from "@/domain/entities/marks/mark-view-daily-data";
import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";

export function markHasDesnconsiderCell(
  marks: MarkViewDailyData[]
) {
  return marks.some(
    (item) => item.desconsiderMarks && item.desconsiderMarks.length > 0,
  );
}

export function markDesconsiderGenerateColumn({ hasDesconsiderMark, width }: { hasDesconsiderMark: boolean, width: number }) {
  return hasDesconsiderMark
    ? [{ columnId: "desconsiderMark", width }]
    : [];
}

export function markDesconsiderGenerateHeader(hasDesconsiderMark: boolean) {
  return hasDesconsiderMark
    ? [{ type: "header", text: "Exclusões", style: cellBorderRemover({ right: true }) } as const]
    : [];
}
