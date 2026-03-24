
import type { Collaborator } from "@/domain/entities/collaborator/collaborator";
import type { MarkDailyResponse } from "@/domain/entities/marks/mark-view-daily-data";
import type { MarkTimetrackingResponse } from "@/domain/entities/marks/mark-view-timetracking-data";
import type { TimetrackingMonthlyResponse } from "@/domain/entities/time-tracking/grids/mothly";
import type { TimeTrackingFormProps, TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
;

export interface TimeTrackingProviderParams {
	children: React.ReactNode;
}

export interface TimeTrackingFormContextProps extends Omit<TimeTrackingFormProps, 'companyId'> {
	setType: (value: TimeTrackingTypeEnum) => void
	setTypeQueryState: (value: string) => void
	setDailyDate: (value: null | Date) => void
	setMonthlyDate: (value: string) => void
	setDateFrom: (value: null | Date) => void
	setDateTo: (value: null | Date) => void
	setSearch: (value: string) => void
	setCollaborator: (value: CollaboratorWithTurnParams) => void
	setMonthlyIsLoading: (value: boolean) => void
	setDailyIsLoading: (value: boolean) => void
	setTimetrackingIsLoading: (value: boolean) => void
	refetchGridValues: () => void
	monthlyIsLoading: boolean
	dailyIsLoading: boolean
	timetrackingIsLoading: boolean
	collaboratorsQuery: UseQueryResult<Collaborator[], Error> | undefined
	typeQueryState: string | null
	headerForm: UseFormReturn<TimeTrackingFormProps>
	monthlyResponse: TimetrackingMonthlyResponse[]
	collaborator?: CollaboratorWithTurnParams
	dailyResponse: MarkDailyResponse | undefined
	timetrackingResponse: MarkTimetrackingResponse | undefined
	setMonthlyResponse: Dispatch<SetStateAction<TimetrackingMonthlyResponse[]>>
	setDailyResponse: Dispatch<SetStateAction<MarkDailyResponse | undefined>>
	setTimetrackingResponse: Dispatch<SetStateAction<MarkTimetrackingResponse | undefined>>
	isTypeDaily: boolean
	isTypeMonthly: boolean
	isTypeTimetracking: boolean,
}
