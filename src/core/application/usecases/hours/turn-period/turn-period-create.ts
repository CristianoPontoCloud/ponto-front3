import type { TurnPeriod, TurnPeriodCreateParams } from "@/domain/entities/turns/turn-period";
import type { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

export interface TurnPeriodCreatedUseCaseDto {
	execute({ body }: TurnPeriodCreateParams): Promise<TurnPeriod | null>;
}

export class TurnPeriodCreatedUseCase implements TurnPeriodCreatedUseCaseDto {
	constructor(private readonly endpoint: TurnPeriodEndpoint) {}

	async execute({ body }: TurnPeriodCreateParams): Promise<TurnPeriod | null> {
		const res = await this.endpoint.create({ body });
		return res?.data ?? null;
	}
}
