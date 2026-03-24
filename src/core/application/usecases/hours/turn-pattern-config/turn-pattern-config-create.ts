import type {
	TurnPatternConfig,
	TurnPatternConfigCreateParams,
} from "@/domain/entities/turns/turn-pattern-config";
import type { TurnPatternConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns-pattern-config";

export interface TurnPatternConfigCreatedUseCaseDto {
	execute({ body }: TurnPatternConfigCreateParams): Promise<TurnPatternConfig | null>;
}

export class TurnPatternConfigCreatedUseCase implements TurnPatternConfigCreatedUseCaseDto {
	constructor(private readonly endpoint: TurnPatternConfigEndpoint) {}

	async execute({ body }: TurnPatternConfigCreateParams): Promise<TurnPatternConfig | null> {
		const res = await this.endpoint.create({ body });
		return res?.data ?? null;
	}
}
