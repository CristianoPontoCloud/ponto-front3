"use client";
import { createContext, useContext, useState } from "react";
import type {
	ScreenContextProps,
	ScreenProviderParams
} from "./screen-type";

const defaultValue: ScreenContextProps = {
	isFullScreen: false,
	hiddenHeader: false,
	hiddenSidebar: false,
	exitFullScreen: () => undefined,
	fullScreen: () => undefined,
	setHiddenHeader: () => undefined,
	setHiddenSidebar: () => undefined,
	setIsFullScreen: () => undefined,
};

const ScreenContext = createContext<ScreenContextProps>(defaultValue);

export function ScreenProvider({ children }: ScreenProviderParams) {
	const [hiddenHeader, setHiddenHeader] = useState<boolean>(defaultValue.hiddenHeader)
	const [hiddenSidebar, setHiddenSidebar] = useState<boolean>(defaultValue.hiddenSidebar)
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

	const navigatorInFullScreen = () => {
		const elem = document.documentElement;
		elem.requestFullscreen().then(() => setIsFullScreen(true)).catch(console.error);
	}

	const navigatorExitFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		}
		setIsFullScreen(false)
	}

	function fullScreen() {
		navigatorInFullScreen()
		setHiddenHeader(true)
		setHiddenSidebar(true)
	}

	function exitFullScreen() {
		navigatorExitFullScreen()
		setHiddenHeader(false)
		setHiddenSidebar(false)
	}

	return (
		<ScreenContext.Provider
			value={{
				isFullScreen,
				hiddenHeader,
				hiddenSidebar,
				setHiddenHeader,
				setHiddenSidebar,
				setIsFullScreen,
				fullScreen,
				exitFullScreen,
			}}
		>
			{children}
		</ScreenContext.Provider>
	);
}

export const useScreen = () => {
	const context = useContext(ScreenContext);

	return context;
};
