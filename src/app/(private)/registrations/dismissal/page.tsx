import { dismissalsFacadeFactory } from "@/application/factories/registrations/dimsissals-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import DismissalsPage from "@/view/pages/registrations/dismissals/dismissals-page";

export default async function Dismissals() {
	const token = await getToken();
	const dismissals = await safePaginationCall({
		facadeFactory: dismissalsFacadeFactory,
		token,
	});

	return <DismissalsPage dismissals={dismissals} />;
}
