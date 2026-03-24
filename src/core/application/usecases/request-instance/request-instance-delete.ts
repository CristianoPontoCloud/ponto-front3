import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceDeleteUseCaseDto {
	execute(requestInstanceId: string): Promise<void>;
}

export class RequestInstanceDeleteUseCase implements RequestInstanceDeleteUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(requestInstanceId: string): Promise<void> {
		const { data } = await this.endpoint.delete(requestInstanceId);
		return data;
	}
}
