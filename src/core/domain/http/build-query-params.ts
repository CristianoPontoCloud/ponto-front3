import type { FilteredParamsDto } from "./http-client";

type FilterParams = Record<string, string | number | undefined | null>;

export function buildQueryParams(params: FilterParams): FilteredParamsDto {
	const query: FilterParams = {};

	for (const key in params) {
		const value = params[key as keyof FilterParams];
		if (value !== undefined && value !== null && value !== "") {
			query[key as keyof FilterParams] = value;
		}
	}

	return query;
}
export function buildQueryParamsAndSerialized(params: FilterParams): string {
	const buildedParams = buildQueryParams(params);
	const serializedParams = new URLSearchParams(
		(buildedParams as Record<string, string>) ?? {},
	).toString();
	return serializedParams ? `?${serializedParams}` : "";
}
