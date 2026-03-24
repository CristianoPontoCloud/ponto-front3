import type { TurnPolicy, TurnPolicyUpdateParams } from "@/domain/entities/turns/turn-policy";
import type { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

export interface TurnPolicyUpdateUseCaseDto {
	execute(params: TurnPolicyUpdateParams): Promise<TurnPolicy | null>;
}

export class TurnPolicyUpdateUseCase implements TurnPolicyUpdateUseCaseDto {
	constructor(private readonly endpoint: TurnPolicyEndpoint) {}

	async execute({ body }: TurnPolicyUpdateParams): Promise<TurnPolicy | null> {
		const res = await this.endpoint.update({ body });
		return res?.data ?? null;
	}
}
