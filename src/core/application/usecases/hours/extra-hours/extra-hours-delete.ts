import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";

export interface ExtraHoursDeleteUseCaseDto {
	execute(equipmentId: string): Promise<void>;
}

export class ExtraHoursDeleteUseCase implements ExtraHoursDeleteUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	async execute(equipmentId: string): Promise<void> {
		const { data } = await this.endpoint.delete(equipmentId);
		return data;
	}
}
