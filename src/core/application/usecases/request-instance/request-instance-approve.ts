import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { JustificationDto } from "@/domain/shared/justification";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceApproveUseCaseDto {
	execute({ body, id }: BodyWithId<JustificationDto>): Promise<void>;
}

export class RequestInstanceApproveUseCase implements RequestInstanceApproveUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(params: BodyWithId<JustificationDto>): Promise<void> {
		const { data } = await this.endpoint.approve(params);
		return data;
	}
}
