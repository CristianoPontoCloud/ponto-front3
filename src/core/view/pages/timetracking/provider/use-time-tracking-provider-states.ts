import type { MarkDailyResponse } from "@/domain/entities/marks/mark-view-daily-data";
import type { MarkTimetrackingResponse } from "@/domain/entities/marks/mark-view-timetracking-data";
import type { TimetrackingMonthlyResponse } from "@/domain/entities/time-tracking/grids/mothly";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import type { ValueLabel } from "@/domain/value-label";
import { useState } from "react";
;

export function useTimeTrackingProviderStates() {
  const [monthlyResponse, setMonthlyResponse] = useState<TimetrackingMonthlyResponse[]>([]);
  const [timetrackingResponse, setTimetrackingResponse] = useState<
    MarkTimetrackingResponse | undefined
  >(undefined);
  const [dailyResponse, setDailyResponse] = useState<MarkDailyResponse | undefined>(
    undefined,
  );
  const [collaborator, setCollaborator] = useState<CollaboratorWithTurnParams | undefined>(undefined);
  const [collaboratorsList, setCollaboratorsList] = useState<ValueLabel[]>([]);
  const [monthlyIsLoading, setMonthlyIsLoading] = useState<boolean>(true);
  const [dailyIsLoading, setDailyIsLoading] = useState<boolean>(true);
  const [timetrackingIsLoading, setTimetrackingIsLoading] = useState<boolean>(true);
  return {
    monthlyResponse,
    setMonthlyResponse,
    timetrackingResponse,
    setTimetrackingResponse,
    dailyResponse,
    setDailyResponse,
    collaborator,
    setCollaborator,
    collaboratorsList,
    setCollaboratorsList,
    monthlyIsLoading,
    setMonthlyIsLoading,
    dailyIsLoading,
    setDailyIsLoading,
    timetrackingIsLoading,
    setTimetrackingIsLoading,
  }
}
export type UseTimetrackingProviderStateReturn = ReturnType<typeof useTimeTrackingProviderStates>
