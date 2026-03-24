import { holidaysFacadeFactory } from "@/application/factories/registrations/holidays-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import HolidaysPage from "@/view/pages/registrations/holidays/holidays-page";

export default async function Holidays() {
	const token = await getToken();
	const holidays = await safePaginationCall({
		facadeFactory: holidaysFacadeFactory,
		token,
	});
	return <HolidaysPage holidays={holidays} />;
}
