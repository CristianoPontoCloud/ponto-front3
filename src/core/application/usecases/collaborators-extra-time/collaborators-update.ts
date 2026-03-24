import type {
	CollaboratorExtraTime,
	CollaboratorExtraTimeUpdateParams,
} from "@/domain/entities/collaborator/collaborator-extra-time";
import type { EditDto } from "@/domain/http/http-client";
import type { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";

export interface CollaboratorExtraTimeUpdateUseCaseParams
	extends Omit<CollaboratorExtraTimeUpdateParams, "startDate" | "endDate" | "cycleOffset"> {
	startDate: Date | null;
	endDate: Date | null;
	cycleOffset: string;
}

export interface CollaboratorExtraTimeUpdateUseCaseDto {
	execute(
		body: EditDto<CollaboratorExtraTimeUpdateUseCaseParams>,
	): Promise<CollaboratorExtraTime | null>;
}

export class CollaboratorExtraTimeUpdateUseCase implements CollaboratorExtraTimeUpdateUseCaseDto {
	constructor(private readonly endpoint: CollaboratorExtraTimeEndpoint) {}

	async execute(
		body: EditDto<CollaboratorExtraTimeUpdateUseCaseParams>,
	): Promise<CollaboratorExtraTime | null> {
		const res = await this.endpoint.update(body);
		return res?.data ?? null;
	}
}
