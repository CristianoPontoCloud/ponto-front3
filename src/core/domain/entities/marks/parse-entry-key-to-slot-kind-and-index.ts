import type { DailySlotKind } from "../daily-slot/daily-slot-shift";
import type { EntryAndOutKey } from "./marks";

export function parseEntryKeyToSlotKindAndIndex(key: EntryAndOutKey) {
  const match = key.match(/^(entry|out)(\d+)$/);

  if (!match) {
    throw new Error(`Invalid key format: ${key}`);
  }

  const [, kind, index] = match;

  return {
    kind: kind.toUpperCase() as 'ENTRY' | 'OUT',
    index: Number(index),
  };
}

export function nextSlotKind(currentKind: DailySlotKind) {
  const kinds: Record<DailySlotKind, DailySlotKind> = {
    ENTRY: "OUT",
    OUT: "ENTRY",
  };
  return kinds[currentKind]
}
