import { oncallsFacadeFactory } from "@/application/factories/hours/on-calls-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import OnCallPage from "@/view/pages/hours/on-calls/on-call-page";

export default async function OnCalls() {
	const token = await getToken();
	const oncalls = await safePaginationCall({
		facadeFactory: oncallsFacadeFactory,
		token,
	});
	return <OnCallPage oncalls={oncalls} />;
}
