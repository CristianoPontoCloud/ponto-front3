import { mirrorMarkFacadeFactory } from "@/application/factories/mirror-mark-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import { MirrorMarkPage } from "@/view/pages/mirror-mark/mirror-mark-page";

export default async function MirrorMark() {
	const token = await getToken();
	const mirrorMarks = await safePaginationCall({
		facadeFactory: mirrorMarkFacadeFactory,
		token,
	});
	return (
		<MirrorMarkPage
			mirrorsMark={mirrorMarks}
		/>
	);
}
