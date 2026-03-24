import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import TurnsPage from "@/view/pages/hours/turns/turns-page";

export default async function Turns() {
	const token = await getToken();
	const turns = await safePaginationCall({
		facadeFactory: turnsFacadeFactory,
		token,
	});
	return <TurnsPage turns={turns} />;
}
