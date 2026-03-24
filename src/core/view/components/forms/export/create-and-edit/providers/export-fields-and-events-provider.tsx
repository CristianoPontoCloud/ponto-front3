"use client";
import { arrayHelper } from "@/application/helpers/array-helpers";
import { type ExportLayoutFormProps, ExportTabEnum } from "@/domain/entities/exports/exports";
import type { ExportEvent } from "@/domain/entities/exports/exports-events";
import type { ExportFields } from "@/domain/entities/exports/exports-fields";
import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";

export interface ExportFieldsProviderParams {
	children: React.ReactNode;
	form: UseFormReturn<ExportLayoutFormProps>;
	tab: ExportTabEnum;
}

export interface ExportFieldsContextProps {
	moveToUp: (index: number) => void;
	moveToDown: (index: number) => void;
	exclude: (index: number) => void;
	form: UseFormReturn<ExportLayoutFormProps>;
	tab: ExportTabEnum;
}

const defaultValue: ExportFieldsContextProps = {
	moveToUp: () => undefined,
	moveToDown: () => undefined,
	exclude: () => undefined,
	form: {} as UseFormReturn<ExportLayoutFormProps>,
	tab: ExportTabEnum.FIELDS,
};

const ScreenContext = createContext<ExportFieldsContextProps>(defaultValue);

export function ExportFieldsAndEventsProvider({ children, form, tab }: ExportFieldsProviderParams) {
	const tabCase = tab === "fields";
	function moveToUp(index: number) {
		const arr = tabCase
			? ([...form.watch(tab)] as ExportFields[])
			: ([...form.watch(tab)] as ExportEvent[]);
		arrayHelper.swapWithPrevious({ arr, index });
		form.setValue(tab, arr);
		return;
	}
	function moveToDown(index: number) {
		const arr = tabCase
			? ([...form.watch(tab)] as ExportFields[])
			: ([...form.watch(tab)] as ExportEvent[]);
		arrayHelper.swapWithNext({ arr, index });
		form.setValue(tab, arr);
		return;
	}
	function exclude(index: number) {
		const arr =
			tab === "fields"
				? ([...form.watch(tab).filter((_, i) => i !== index)] as ExportFields[])
				: ([...form.watch(tab).filter((_, i) => i !== index)] as ExportEvent[]);
		form.setValue(tab, arr);
		return;
	}

	return (
		<ScreenContext.Provider
			value={{
				exclude,
				moveToDown,
				moveToUp,
				form,
				tab,
				// setTab,
			}}
		>
			{children}
		</ScreenContext.Provider>
	);
}

export const useContextExportFieldsAndEventsProvider = () => {
	const context = useContext(ScreenContext);
	return context;
};
