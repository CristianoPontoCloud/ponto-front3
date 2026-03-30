import { receiptsFacadeFactory } from "@/application/factories/receipts-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import { ReceiptsPage } from "@/view/pages/receipts/receipts-page";

export default async function RequestManagement() {
	const token = await getToken();
	const receipts = await safePaginationCall({
		facadeFactory: receiptsFacadeFactory,
		token,
	});
	return (
		<ReceiptsPage
			receipts={receipts}
		/>
	);
}
