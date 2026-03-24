import type { Dispatch, SetStateAction } from "react";

export interface ScreenProviderParams {
	children: React.ReactNode;
}


export interface ScreenContextProps {
	isFullScreen: boolean
	hiddenHeader: boolean
	hiddenSidebar: boolean
	setHiddenHeader: Dispatch<SetStateAction<boolean>>
	setHiddenSidebar: Dispatch<SetStateAction<boolean>>
	setIsFullScreen: Dispatch<SetStateAction<boolean>>
	fullScreen: VoidFunction
	exitFullScreen: VoidFunction
}
