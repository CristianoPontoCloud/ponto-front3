"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { SheetContextProps, SheetProviderParams } from "./sheet-type";

const defaultValue: SheetContextProps = {
	open: false,
	setOpen: () => null,
};

const SheetContext = createContext<SheetContextProps>(defaultValue);

export function SheetProvider({ children }: SheetProviderParams) {
	const [open, setOpen] = useState<boolean>(false);
	useEffect(() => {
		document.body.style.pointerEvents = "";
	}, []);
	return (
		<SheetContext.Provider value={{ open, setOpen }}>
			{children}
		</SheetContext.Provider>
	);
}

export const useSheet = () => {
	const context = useContext(SheetContext);

	if (context.setOpen === defaultValue.setOpen) {
		throw new Error("useSheet deve ser usado dentro de um SheetProvider");
	}

	return context;
};
