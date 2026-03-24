import type { TurnsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/turns/turns";

export interface TurnsDeleteUseCaseDto {
	execute(workShiftId: string): Promise<void>;
}

export class TurnsDeleteUseCase implements TurnsDeleteUseCaseDto {
	constructor(private readonly endpoint: TurnsEndpoint) {}
	async execute(workShiftId: string): Promise<void> {
		const { data } = await this.endpoint.delete(workShiftId);
		return data;
	}
}
