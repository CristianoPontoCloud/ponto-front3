"use client";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { pontoCloudLocalStorage } from "@/application/local-storage/local-storage-abstraction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { createContext, useContext, useEffect, useMemo } from "react";
import type {
	TimeTrackingFormContextProps,
	TimeTrackingProviderParams,
} from "./time-tracking-provider-type";
import { timetrackingContextInitialValues } from "./timetracking-context-initial-values";
import { useTimeTrackingProviderForm } from "./use-time-tracking-provider-form";
import { useTimeTrackingProviderStates } from "./use-time-tracking-provider-states";
import { useTimeTrackingProviderWebsoketConsumer } from "./use-time-tracking-provider-websocket-consumer";
const TimeTrackingContext = createContext<TimeTrackingFormContextProps>(
	timetrackingContextInitialValues,
);
export function TimeTrackingProvider({ children }: TimeTrackingProviderParams) {
	const formHook = useTimeTrackingProviderForm();
	const statesHook = useTimeTrackingProviderStates();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const collaboratorFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);
	const collaboratorsQuery = useQuery({
		queryKey: ["combobox-options", "collaborator", token],
		queryFn: async () => {
			const response = await collaboratorFacade.findAll();
			return response.data ?? [];
		},
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});
	const [typeQueryState, setTypeQueryState] = useQueryState("type", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const contextValues = {
		...formHook,
		...statesHook,
		typeQueryState,
		setTypeQueryState,
		collaboratorsQuery,
	};
	const { refetchGridValues } = useTimeTrackingProviderWebsoketConsumer(contextValues); // async function getAllResponses() {
	useEffect(() => {
		if (typeQueryState !== formHook.type) {
			setTypeQueryState(formHook.type);
		}

		pontoCloudLocalStorage.set("timetracking:type", formHook.type ?? "");
	}, [formHook.type, typeQueryState, setTypeQueryState]);
	return (
		<TimeTrackingContext.Provider value={{ ...{ ...contextValues, refetchGridValues } }}>
			{children}
		</TimeTrackingContext.Provider>
	);
}
export const useContextTimeTracking = () => {
	const context = useContext(TimeTrackingContext);
	return context;
};
