import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import RequestsPage from "@/view/pages/registrations/requests/requests-page";

export default async function Requests() {
	const token = await getToken();
	const requests = await safePaginationCall({
		facadeFactory: requestsFacadeFactory,
		token,
	});
	return <RequestsPage requests={requests} />;
}
