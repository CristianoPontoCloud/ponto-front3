import type { TurnDay, TurnDayCreateParams } from "@/domain/entities/turns/turn-day";
import type { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

export interface TurnDayCreatedUseCaseDto {
	execute({ body }: TurnDayCreateParams): Promise<TurnDay | null>;
}

export class TurnDayCreatedUseCase implements TurnDayCreatedUseCaseDto {
	constructor(private readonly endpoint: TurnDayEndpoint) {}

	async execute({ body }: TurnDayCreateParams): Promise<TurnDay | null> {
		const res = await this.endpoint.create({ body });
		return res?.data ?? null;
	}
}
