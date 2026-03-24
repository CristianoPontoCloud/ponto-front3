import type { Turn } from "@/domain/entities/turns/turns";
import type { EditDto } from "@/domain/http/http-client";
import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

export interface TurnsUpdateUseCaseDto {
	execute(body: EditDto<Turn>): Promise<Turn | null>;
}

export class TurnsUpdateUseCase implements TurnsUpdateUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}

	async execute(body: EditDto<Turn>): Promise<Turn | null> {
		const res = await this.endpoint.update(body);
		return res?.data ?? null;
	}
}
