import { positionsFacadeFactory } from "@/application/factories/registrations/positions-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import PositionsPage from "@/view/pages/registrations/positions/positions-page";

export default async function Positions() {
	const token = await getToken();
	const positions = await safePaginationCall({
		facadeFactory: positionsFacadeFactory,
		token,
	});

	return <PositionsPage positions={positions} />;
}
