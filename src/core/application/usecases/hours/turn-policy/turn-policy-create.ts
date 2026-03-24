import type { TurnPolicy, TurnPolicyCreateParams } from "@/domain/entities/turns/turn-policy";
import type { TurnPolicyEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-policy";

export interface TurnPolicyCreatedUseCaseDto {
	execute({ body }: TurnPolicyCreateParams): Promise<TurnPolicy | null>;
}

export class TurnPolicyCreatedUseCase implements TurnPolicyCreatedUseCaseDto {
	constructor(private readonly endpoint: TurnPolicyEndpoint) {}

	async execute({ body }: TurnPolicyCreateParams): Promise<TurnPolicy | null> {
		const res = await this.endpoint.create({ body });
		return res?.data ?? null;
	}
}
