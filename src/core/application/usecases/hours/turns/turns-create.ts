import type { Turn } from "@/domain/entities/turns/turns";
import type { CreateDto } from "@/domain/http/http-client";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";
import { TurnAdapter } from "./turn-adapter";

export interface TurnsCreatedUseCaseDto {
	execute(body: CreateDto<Turn>): Promise<Turn | null>;
}

export class TurnsCreatedUseCase implements TurnsCreatedUseCaseDto {
	private adapter = new TurnAdapter()
	constructor(private readonly endpoint: TurnsEndpoint) { }

	async execute(body: CreateDto<Turn>): Promise<Turn | null> {
		const adaptedBody: CreateDto<Turn> = this.adapter.onPost(body)
		console.log({ adaptedBody })
		const res = await this.endpoint.create(adaptedBody);
		return res?.data ?? null;
	}
}
