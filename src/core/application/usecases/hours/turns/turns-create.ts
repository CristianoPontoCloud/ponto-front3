import type { Turn } from "@/domain/entities/turns/turns";
import type { CreateDto } from "@/domain/http/http-client";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

export interface TurnsCreatedUseCaseDto {
	execute(body: CreateDto<Turn>): Promise<Turn | null>;
}

export class TurnsCreatedUseCase implements TurnsCreatedUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}

	async execute(body: CreateDto<Turn>): Promise<Turn | null> {
		const res = await this.endpoint.create(body);
		return res?.data ?? null;
	}
}
