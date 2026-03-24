import type {
	TurnPatternConfig,
	TurnPatternConfigFindByIdParams,
} from "@/domain/entities/turns/turn-pattern-config";
import type { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

export interface TurnPatternConfigFindByIdUseCaseDto {
	execute(params: TurnPatternConfigFindByIdParams): Promise<TurnPatternConfig | null>;
}

export class TurnPatternConfigFindByIdUseCase implements TurnPatternConfigFindByIdUseCaseDto {
	constructor(private readonly endpoint: TurnPatternConfigEndpoint) {}

	async execute({
		patternConfigId,
	}: TurnPatternConfigFindByIdParams): Promise<TurnPatternConfig | null> {
		const res = await this.endpoint.findById({ patternConfigId });
		return res?.data ?? null;
	}
}
