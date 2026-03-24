import type { CollaboratorWorkShiftEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-work-shift";

export interface CollaboratorWorkShiftDeleteUseCaseDto {
	execute(collaboratorWorkShiftId: string): Promise<void>;
}

export class CollaboratorWorkShiftDeleteUseCase implements CollaboratorWorkShiftDeleteUseCaseDto {
	constructor(private readonly endpoint: CollaboratorWorkShiftEndpoint) {}
	async execute(collaboratorWorkShiftId: string): Promise<void> {
		const { data } = await this.endpoint.delete(collaboratorWorkShiftId);
		return data;
	}
}
