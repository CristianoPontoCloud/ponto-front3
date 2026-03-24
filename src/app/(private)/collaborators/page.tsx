import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import CollaboratorsPage from "@/view/pages/collaborators/collaborators-page";

export default async function Collaborators() {
	const token = await getToken();
	const collaborators = await safePaginationCall({
		facadeFactory: collaboratorsFacadeFactory,
		token,
	});
	return <CollaboratorsPage collaborators={collaborators} />;
}
