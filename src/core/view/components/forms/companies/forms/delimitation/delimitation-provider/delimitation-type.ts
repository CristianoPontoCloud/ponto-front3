import type { DelimitationFormType, GeoFence } from "@/domain/entities/delimitation";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateAndEditGeoFence } from "../delimitation-actions-types";

export interface DelimitationProviderParams {
	children: React.ReactNode;
}

export interface DelimitationChangeStatusParams { newStatus: boolean; delimitationId: string }
export interface DelimitationContextProps {
	delimitationForm: UseFormReturn<CreateAndEditGeoFence>
	openSheetDelimitation: boolean
	setOpenSheetDelimitation: Dispatch<SetStateAction<boolean>>
	delimitationId: string
	openEditDelimitationForm(delimitationId: string): Promise<void>
	openDelimitationForm(): void
	openModalExcludeDelimitation(delimitationId: string): void
	delimitationsQuery: UseQueryResult<PaginationDto<GeoFence[]>> | undefined
	changeStatusDelimitation(params: DelimitationChangeStatusParams): Promise<void>
	handleSubmit(): Promise<void>
	type: DelimitationFormType
	setType: Dispatch<SetStateAction<DelimitationFormType>>
}
