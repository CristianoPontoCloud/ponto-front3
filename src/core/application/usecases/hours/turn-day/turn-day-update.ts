import type { TurnDay, TurnDayUpdateParams } from "@/domain/entities/turns/turn-day";
import type { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

export interface TurnDayUpdateUseCaseDto {
	execute(params: TurnDayUpdateParams): Promise<TurnDay | null>;
}

export class TurnDayUpdateUseCase implements TurnDayUpdateUseCaseDto {
	constructor(private readonly endpoint: TurnDayEndpoint) {}

	async execute({ body }: TurnDayUpdateParams): Promise<TurnDay | null> {
		const res = await this.endpoint.update({ body });
		return res?.data ?? null;
	}
}
