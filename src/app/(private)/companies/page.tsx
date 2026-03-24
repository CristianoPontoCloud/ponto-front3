import { companiesFacadeFactory } from "@/application/factories/companies-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import CompaniesPage from "@/view/pages/companies/companies-page";

export default async function Companies() {
	const token = await getToken();
	const companies = await safePaginationCall({
		facadeFactory: companiesFacadeFactory,
		token,
	});
	return <CompaniesPage companies={companies} />;
}
