import type { UserSession } from "@/domain/authentication/signin";
import { decodeJWT } from "@/domain/global-helpers/decode-jwt";
import type { FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

interface FacadeFactory<Data> {
	filtered(params?: FilteredParamsDto): Promise<PaginationDto<Data[]>>;
}
interface SafePaginationCallParams<Data> {
	facadeFactory: (token: string) => FacadeFactory<Data>;
	token: string;
	method?: "findAll" | "filtered";
	urlParams?: Record<string, string | undefined>;
}

export async function safePaginationCall<Data>({
	token,
	facadeFactory,
}: SafePaginationCallParams<Data>): Promise<PaginationDto<Data[]>> {
	const facade = facadeFactory(token);
	const decodedToken = decodeJWT<UserSession>(token);
	try {
		return await facade.filtered({
			companyId: decodedToken?.companyId,
			parentCompanyId: decodedToken?.parentCompanyId,
		});
	} catch {
		return {
			lastPage: 0,
			page: 0,
			success: false,
			total: 0,
			data: [],
		};
	}
}
