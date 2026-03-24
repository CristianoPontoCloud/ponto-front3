import type { TurnWithCollaboratorsAndPolicy } from "@/domain/entities/turns/turns";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

export interface TurnsFindByIdUseCaseDto {
	execute(turnId: string): Promise<TurnWithCollaboratorsAndPolicy | null>;
}

export class TurnsFindByIdUseCase implements TurnsFindByIdUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}

	async execute(turnId: string): Promise<TurnWithCollaboratorsAndPolicy | null> {
		const res = await this.endpoint.findById(turnId);
		if (!res?.data) return null;
		const policyArray = Object.entries(res.data.policy).map(([key, value]) => [
			key,
			typeof value !== "string" ? `${value}` : value,
		]);
		const policyObject = Object.fromEntries(policyArray);
		return { ...res.data, policy: policyObject, policyId: policyObject.id };
	}
}
