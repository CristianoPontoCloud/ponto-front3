import type {
	TurnPatternConfig,
	TurnPatternConfigUpdateParams,
} from "@/domain/entities/turns/turn-pattern-config";
import type { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

export interface TurnPatternConfigUpdateUseCaseDto {
	execute(params: TurnPatternConfigUpdateParams): Promise<TurnPatternConfig | null>;
}

export class TurnPatternConfigUpdateUseCase implements TurnPatternConfigUpdateUseCaseDto {
	constructor(private readonly endpoint: TurnPatternConfigEndpoint) {}

	async execute({ body }: TurnPatternConfigUpdateParams): Promise<TurnPatternConfig | null> {
		const res = await this.endpoint.update({ body });
		return res?.data ?? null;
	}
}
