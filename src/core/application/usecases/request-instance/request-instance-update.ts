import type {
	RequestInstance,
	RequestInstanceDetails,
} from "@/domain/entities/request-instance/request-instance";
import type { EditDto } from "@/domain/http/http-client";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceUpdateUseCaseDto {
	execute(body: EditDto<RequestInstance>): Promise<RequestInstanceDetails | null>;
}

export class RequestInstanceUpdateUseCase implements RequestInstanceUpdateUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}

	async execute(body: EditDto<RequestInstance>): Promise<RequestInstanceDetails | null> {
		const res = await this.endpoint.update(body);
		return res?.data ?? null;
	}
}
