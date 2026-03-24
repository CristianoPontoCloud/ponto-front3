import { occurrencesFacadeFactory } from "@/application/factories/registrations/occurrences-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import OccurrencesPage from "@/view/pages/registrations/occurrences/occurrence-page";

export default async function Occurrences() {
	const token = await getToken();
	const occurrences = await safePaginationCall({
		facadeFactory: occurrencesFacadeFactory,
		token,
	});

	return <OccurrencesPage occurrences={occurrences} />;
}
