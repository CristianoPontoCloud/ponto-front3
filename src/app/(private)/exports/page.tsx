import { exportsFacadeFactory } from "@/application/factories/exports-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import { ExportsPage } from "@/view/pages/exports/exports-page";

export default async function Exports() {
	const token = await getToken();
	const exports = await safePaginationCall({
		facadeFactory: exportsFacadeFactory,
		token,
	});

	return <ExportsPage exports={exports} />;
}
