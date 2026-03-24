import type { TurnPatternConfigDeleteParams } from "@/domain/entities/turns/turn-pattern-config";
import type { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

export interface TurnPatternConfigDeleteUseCaseDto {
	execute({ patternConfigId }: TurnPatternConfigDeleteParams): Promise<void>;
}

export class TurnPatternConfigDeleteUseCase implements TurnPatternConfigDeleteUseCaseDto {
	constructor(private readonly endpoint: TurnPatternConfigEndpoint) {}
	async execute({ patternConfigId }: TurnPatternConfigDeleteParams): Promise<void> {
		const { data } = await this.endpoint.delete({ patternConfigId });
		return data;
	}
}
