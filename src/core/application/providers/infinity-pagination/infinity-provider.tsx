import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { type UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { type ReactNode, createContext, useContext, useMemo } from "react";

export interface PaginationData<TData = unknown> {
	items: TData[];
}

interface FacadeFactory<TData> {
	filtered(params?: FilteredParamsDto): Promise<PaginationDto<TData[]>>;
}

interface ProviderProps<TData> {
	queryKey: string;
	initialData: PaginationDto<TData[]>;
	facadeFactory: (token: string) => FacadeFactory<TData>;
	children: ReactNode;
	sendParentCompanyId?: boolean;
	sendCollaboratorId?: boolean;
}

const Context = createContext<{
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	query: UseInfiniteQueryResult<any, Error> | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	flatData: any[];
}>({
	flatData: [],
	query: null,
});

// async function getDataToEndpoint<T>(token: string, endpoint: string): Promise<PaginationDto<T[]>> {
// 	const res = await createPontoCloudApi(token).get<PaginationDto<T[]>>(`register/${endpoint}`);
// 	return res?.data;
// }

export function InfinityQueryProvider<TData = unknown>({
	queryKey,
	children,
	initialData,
	facadeFactory,
	sendParentCompanyId,
	sendCollaboratorId,
}: ProviderProps<TData>) {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const parentCompanyId = sendParentCompanyId
		? (session.data?.user.parentCompanyId ?? "")
		: undefined;
	const collaboratorId = sendCollaboratorId ? (session.data?.user.collaboratorId ?? "") : undefined;
	const [status] = useQueryState("status", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const [name] = useQueryState("name", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});

	const facade = useMemo(() => facadeFactory(token), [token, facadeFactory]);
	const query = useInfiniteQuery<PaginationDto<TData[]>>({
		queryKey: [queryKey, status, name, companyId, collaboratorId],
		queryFn: async ({ pageParam }) => {
			const page = pageParam as string;
			return await facade.filtered({
				status: status ?? undefined,
				page: page ?? undefined,
				name: name ?? undefined,
				companyId,
				parentCompanyId,
				collaboratorId,
			});
		},
		getNextPageParam: (res) => {
			if (res.page === res.lastPage) return undefined;
			const newPage = res.page + 1;
			return newPage;
		},
		initialPageParam: 1,
		initialData: () => ({
			pageParams: [1],
			pages: [initialData],
		}),
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	const flatData = useMemo(() => {
		return query.data?.pages.flatMap((page) => page.data ?? []) ?? [];
	}, [query.data]);
	// useEffect(() => {
	// 	query.refetch();
	// }, [sendCollaboratorId]);
	return <Context.Provider value={{ query, flatData }}>{children}</Context.Provider>;
}

export function useInfinityQueryContext<TData = unknown>() {
	const context = useContext(Context);
	if (!context)
		throw new Error("useInfinityQueryContext deve estar dentro de InfinityQueryProvider");

	return context as {
		query: UseInfiniteQueryResult<TData, Error> | null;
		flatData: TData[];
	};
}
