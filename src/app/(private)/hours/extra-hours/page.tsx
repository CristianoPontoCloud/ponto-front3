import { extraHoursFacadeFactory } from "@/application/factories/hours/extra-hours-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import ExtraHourPage from "@/view/pages/hours/extra-hour/extra-hour-page";

export default async function ExtraHours() {
	const token = await getToken();
	const extrahours = await safePaginationCall({
		facadeFactory: extraHoursFacadeFactory,
		token,
	});
	return <ExtraHourPage extraHours={extrahours} />;
}
