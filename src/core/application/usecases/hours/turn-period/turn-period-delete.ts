import type { TurnPeriodDeleteParams } from "@/domain/entities/turns/turn-period";
import type { TurnPeriodEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-period";

export interface TurnPeriodDeleteUseCaseDto {
	execute({ periodId }: TurnPeriodDeleteParams): Promise<void>;
}

export class TurnPeriodDeleteUseCase implements TurnPeriodDeleteUseCaseDto {
	constructor(private readonly endpoint: TurnPeriodEndpoint) {}
	async execute({ periodId }: TurnPeriodDeleteParams): Promise<void> {
		const { data } = await this.endpoint.delete({ periodId });
		return data;
	}
}
