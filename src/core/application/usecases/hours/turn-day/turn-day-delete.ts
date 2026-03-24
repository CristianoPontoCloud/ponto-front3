import type { TurnDayDeleteParams } from "@/domain/entities/turns/turn-day";
import type { TurnDayEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-day";

export interface TurnDayDeleteUseCaseDto {
	execute({ dayId }: TurnDayDeleteParams): Promise<void>;
}

export class TurnDayDeleteUseCase implements TurnDayDeleteUseCaseDto {
	constructor(private readonly endpoint: TurnDayEndpoint) {}
	async execute({ dayId }: TurnDayDeleteParams): Promise<void> {
		const { data } = await this.endpoint.delete({ dayId });
		return data;
	}
}
