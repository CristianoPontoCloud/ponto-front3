import { costcentersFacadeFactory } from "@/application/factories/registrations/costcenter-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import CostCentersPage from "@/view/pages/registrations/center-cost/cost-centers-page";

export default async function CostCenters() {
	const token = await getToken();
	const costCenters = await safePaginationCall({
		facadeFactory: costcentersFacadeFactory,
		token,
	});
	return <CostCentersPage costCenters={costCenters} />;
}
