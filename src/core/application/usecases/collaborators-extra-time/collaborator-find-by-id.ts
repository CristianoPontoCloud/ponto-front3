import type { CollaboratorExtraTime } from "@/domain/entities/collaborator/collaborator-extra-time";
import type { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";

export interface CollaboratorExtraTimeFindByIdUseCaseDto {
	execute(collaboratorExtraTimeId: string): Promise<CollaboratorExtraTime | null>;
}

export class CollaboratorExtraTimeFindByIdUseCase
	implements CollaboratorExtraTimeFindByIdUseCaseDto
{
	constructor(private readonly endpoint: CollaboratorExtraTimeEndpoint) {}

	async execute(collaboratorExtraTimeId: string): Promise<CollaboratorExtraTime | null> {
		const res = await this.endpoint.findById(collaboratorExtraTimeId);
		return {
			...res.data,
		};
	}
}
