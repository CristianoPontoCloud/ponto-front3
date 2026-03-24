import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface SheetContentControllerProviderParams {
	children: React.ReactNode;
}

export interface SheetContentControllerParams {
	Body: ReactNode;
	Header: ReactNode;
	description?: string;
	sheetWidth?: string;
	sheetMinWidth?: string;
	sheetMaxWidth?: string;
}

export interface SheetContentControllerContextProps {
	content: SheetContentControllerParams
	setContent: Dispatch<SetStateAction<SheetContentControllerParams>>
	setContentAndOpen: (params: SheetContentControllerParams) => void
	reset: VoidFunction
}
