"use client";
import { type ThemeProviderProps, useTheme } from "next-themes";

import { createContext, useContext, useEffect, useState } from "react";
import setGlobalColorTheme from "./colors";
import type { ThemeColorStateParams, ThemeColors } from "./theme-types";

const ThemeContext = createContext<ThemeColorStateParams>({} as ThemeColorStateParams);

export default function ColorsProvider({ children }: ThemeProviderProps) {
	const getSavedThemeColor = () => {
		try {
			return (localStorage.getItem("themeColor") as ThemeColors) || "Sky";
		} catch {
			return "Sky" as ThemeColors;
		}
	};

	const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor() as ThemeColors);
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		localStorage.setItem("themeColor", themeColor);
		if (theme === "system") {
			setTheme("light");
			setGlobalColorTheme("light", themeColor);
		} else {
			setGlobalColorTheme(theme as "light" | "dark", themeColor);
		}

		if (!isMounted) {
			setIsMounted(true);
		}
	}, [themeColor, theme, isMounted, setTheme]);

	if (!isMounted) {
		return null;
	}

	return (
		<ThemeContext.Provider value={{ themeColor, setThemeColor }}>{children}</ThemeContext.Provider>
	);
}

export function useThemeContext() {
	return useContext(ThemeContext);
}
