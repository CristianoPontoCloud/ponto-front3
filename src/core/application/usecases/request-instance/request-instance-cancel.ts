import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { JustificationDto } from "@/domain/shared/justification";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceCancelUseCaseDto {
	execute({ body, id }: BodyWithId<JustificationDto>): Promise<void>;
}

export class RequestInstanceCancelUseCase implements RequestInstanceCancelUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(params: BodyWithId<JustificationDto>): Promise<void> {
		const { data } = await this.endpoint.cancel(params);
		return data;
	}
}
