import { equipmentsFacadeFactory } from "@/application/factories/registrations/equipments-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import EquipmentsPage from "@/view/pages/registrations/equipments/equiments-page";

export default async function Equipments() {
	const token = await getToken();
	const equipments = await safePaginationCall({
		facadeFactory: equipmentsFacadeFactory,
		token,
	});

	return <EquipmentsPage equipments={equipments} />;
}
