import { accessProfileFacadeFactory } from "@/application/factories/access-profile-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import { AccessProfilePage } from "@/view/pages/access-profile/access-profiles/access-profile-page";

export default async function AccessProfiles() {
	const token = await getToken();
	const accessProfiles = await safePaginationCall({
		facadeFactory: accessProfileFacadeFactory,
		token,
	});
	return <AccessProfilePage markingProlfiles={accessProfiles} />;
}
