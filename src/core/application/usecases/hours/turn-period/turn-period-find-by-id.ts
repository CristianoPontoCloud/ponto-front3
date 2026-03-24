import type { TurnPeriod, TurnPeriodFindByIdParams } from "@/domain/entities/turns/turn-period";
import type { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

export interface TurnPeriodFindByIdUseCaseDto {
	execute(params: TurnPeriodFindByIdParams): Promise<TurnPeriod | null>;
}

export class TurnPeriodFindByIdUseCase implements TurnPeriodFindByIdUseCaseDto {
	constructor(private readonly endpoint: TurnPeriodEndpoint) {}

	async execute({ periodId }: TurnPeriodFindByIdParams): Promise<TurnPeriod | null> {
		const res = await this.endpoint.findById({ periodId });
		return res?.data ?? null;
	}
}
