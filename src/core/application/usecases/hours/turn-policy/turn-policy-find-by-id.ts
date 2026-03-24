import type { TurnPolicy, TurnPolicyFindByIdParams } from "@/domain/entities/turns/turn-policy";
import type { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

export interface TurnPolicyFindByIdUseCaseDto {
	execute(params: TurnPolicyFindByIdParams): Promise<TurnPolicy | null>;
}

export class TurnPolicyFindByIdUseCase implements TurnPolicyFindByIdUseCaseDto {
	constructor(private readonly endpoint: TurnPolicyEndpoint) {}

	async execute({ policyId }: TurnPolicyFindByIdParams): Promise<TurnPolicy | null> {
		const res = await this.endpoint.findById({ policyId });
		return res?.data ?? null;
	}
}
