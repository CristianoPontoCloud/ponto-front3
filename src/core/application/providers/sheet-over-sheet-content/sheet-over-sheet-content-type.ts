import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface SheetOverSheetContentControllerProviderParams {
	children: React.ReactNode;
}

export interface SheetOverSheetContentControllerParams {
	Body: ReactNode;
	Header: ReactNode;
	description?: string;
	sheetWidth?: string;
	sheetMinWidth?: string;
	sheetMaxWidth?: string;
}

export interface SheetOverSheetContentControllerContextProps {
	open: boolean
	content: SheetOverSheetContentControllerParams
	setContent: Dispatch<SetStateAction<SheetOverSheetContentControllerParams>>
	setContentAndOpen: (params: SheetOverSheetContentControllerParams) => void
	reset: VoidFunction
}
