import type { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";

export interface CollaboratorExtraTimeDeleteUseCaseDto {
	execute(collaboratorExtraTimeId: string): Promise<void>;
}

export class CollaboratorExtraTimeDeleteUseCase implements CollaboratorExtraTimeDeleteUseCaseDto {
	constructor(private readonly endpoint: CollaboratorExtraTimeEndpoint) {}
	async execute(collaboratorExtraTimeId: string): Promise<void> {
		const { data } = await this.endpoint.delete(collaboratorExtraTimeId);
		return data;
	}
}
