import type { TurnPolicyDeleteParams } from "@/domain/entities/turns/turn-policy";
import type { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

export interface TurnPolicyDeleteUseCaseDto {
	execute({ policyId }: TurnPolicyDeleteParams): Promise<void>;
}

export class TurnPolicyDeleteUseCase implements TurnPolicyDeleteUseCaseDto {
	constructor(private readonly endpoint: TurnPolicyEndpoint) {}
	async execute({ policyId }: TurnPolicyDeleteParams): Promise<void> {
		const { data } = await this.endpoint.delete({ policyId });
		return data;
	}
}
