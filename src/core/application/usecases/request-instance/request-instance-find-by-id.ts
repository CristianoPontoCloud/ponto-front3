import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceFindByIdUseCaseDto {
	execute(collaboratorId: string): Promise<RequestInstanceDetails | null>;
}

export class RequestInstanceFindByIdUseCase implements RequestInstanceFindByIdUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}

	async execute(collaboratorId: string): Promise<RequestInstanceDetails | null> {
		const res = await this.endpoint.findById(collaboratorId);
		return {
			...res.data,
		};
	}
}
