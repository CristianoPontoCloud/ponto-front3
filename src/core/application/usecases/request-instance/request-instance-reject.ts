import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { JustificationDto } from "@/domain/shared/justification";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceRejectUseCaseDto {
	execute({ body, id }: BodyWithId<JustificationDto>): Promise<void>;
}

export class RequestInstanceRejectUseCase implements RequestInstanceRejectUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(params: BodyWithId<JustificationDto>): Promise<void> {
		const { data } = await this.endpoint.reject(params);
		return data;
	}
}
