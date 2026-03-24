import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { DefinedUseInfiniteQueryResult } from "@tanstack/react-query";

export interface InfinityPaginationProviderParams<TData> {
	children: React.ReactNode;
	endpoint: string;
	initialData: TData[];
}

export interface InfinityPaginationContextProps<TData = unknown> {
	infinityPaginationMethods: DefinedUseInfiniteQueryResult<
		PaginationDto<TData[]>,            // dado paginado
		unknown                            // tipo do erro
	>;
}
