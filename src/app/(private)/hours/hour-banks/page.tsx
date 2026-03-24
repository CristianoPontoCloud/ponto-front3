import { hourBanksFacadeFactory } from "@/application/factories/hours/hour-banks-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import HourBankPage from "@/view/pages/hours/hour-bank/hour-bank-page";

export default async function HourBanks() {
	const token = await getToken();
	const hourbanks = await safePaginationCall({
		facadeFactory: hourBanksFacadeFactory,
		token,
	});
	return <HourBankPage hourbanks={hourbanks} />;
}
