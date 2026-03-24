import type {
	RequestInstance,
	RequestInstanceDetails,
} from "@/domain/entities/request-instance/request-instance";
import type { CreateDto } from "@/domain/http/http-client";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstaceCreateUseCaseDto {
	execute(body: CreateDto<RequestInstance>): Promise<RequestInstanceDetails | null>;
}

export class RequestInstanceCreateUseCase implements RequestInstaceCreateUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}

	async execute(body: CreateDto<RequestInstance>): Promise<RequestInstanceDetails | null> {
		const res = await this.endpoint.create({ ...body });
		return res?.data ?? null;
	}
}
