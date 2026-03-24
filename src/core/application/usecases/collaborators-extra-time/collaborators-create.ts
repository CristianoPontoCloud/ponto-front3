import type {
	CollaboratorExtraTime,
	CollaboratorExtraTimeCreateParams,
} from "@/domain/entities/collaborator/collaborator-extra-time";
import type { CreateDto } from "@/domain/http/http-client";
import type { CollaboratorExtraTimeEndpoint } from "@/infra/apis/ponto-cloud-client-side/collaborator/collaborator-extra-time";

export interface CollaboratorExtraTimeCreateUseCaseParams
	extends Omit<CollaboratorExtraTimeCreateParams, "startDate" | "endDate" | "cycleOffset"> {
	startDate: Date | null;
	endDate: Date | null;
}

export interface CollaboratorExtraTimeCreatedUseCaseDto {
	execute(
		body: CreateDto<CollaboratorExtraTimeCreateParams>,
	): Promise<CollaboratorExtraTime | null>;
}

export class CollaboratorExtraTimeCreatedUseCase implements CollaboratorExtraTimeCreatedUseCaseDto {
	constructor(private readonly endpoint: CollaboratorExtraTimeEndpoint) {}

	async execute(
		body: CreateDto<CollaboratorExtraTimeCreateParams>,
	): Promise<CollaboratorExtraTime | null> {
		const res = await this.endpoint.create(body);
		return res?.data ?? null;
	}
}
