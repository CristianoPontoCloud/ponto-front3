import type { TurnDay, TurnDayFindByIdParams } from "@/domain/entities/turns/turn-day";
import type { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

export interface TurnDayFindByIdUseCaseDto {
	execute(params: TurnDayFindByIdParams): Promise<TurnDay | null>;
}

export class TurnDayFindByIdUseCase implements TurnDayFindByIdUseCaseDto {
	constructor(private readonly endpoint: TurnDayEndpoint) {}

	async execute({ dayId }: TurnDayFindByIdParams): Promise<TurnDay | null> {
		const res = await this.endpoint.findById({ dayId });
		return res?.data ?? null;
	}
}
