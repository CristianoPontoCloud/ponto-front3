import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { ReasonDto } from "@/domain/shared/reason";
import type { RequestInstanceEndpoint } from "@/infra/apis/ponto-cloud-client-side/request-instance";

export interface RequestInstanceReasonUseCaseDto {
	execute({ body, id }: BodyWithId<ReasonDto>): Promise<void>;
}

export class RequestInstanceReasonUseCase implements RequestInstanceReasonUseCaseDto {
	constructor(private readonly endpoint: RequestInstanceEndpoint) {}
	async execute(params: BodyWithId<ReasonDto>): Promise<void> {
		const { data } = await this.endpoint.reason(params);
		return data;
	}
}
