import type { TurnPeriod, TurnPeriodUpdateParams } from "@/domain/entities/turns/turn-period";
import type { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

export interface TurnPeriodUpdateUseCaseDto {
	execute(params: TurnPeriodUpdateParams): Promise<TurnPeriod | null>;
}

export class TurnPeriodUpdateUseCase implements TurnPeriodUpdateUseCaseDto {
	constructor(private readonly endpoint: TurnPeriodEndpoint) {}

	async execute({ body }: TurnPeriodUpdateParams): Promise<TurnPeriod | null> {
		const res = await this.endpoint.update({ body });
		return res?.data ?? null;
	}
}
