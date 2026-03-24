import type { ExtraHourDetails } from "@/domain/entities/extra-hour/extra-hour";
import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";
import { ExtraHourAdapter } from "./extra-hours-adapter";

export interface ExtraHoursFindByIdUseCaseDto {
	execute(extrahourId: string): Promise<ExtraHourDetails | null>;
}

export class ExtraHoursFindByIdUseCase implements ExtraHoursFindByIdUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	private adapter = new ExtraHourAdapter();

	async execute(extrahourId: string): Promise<ExtraHourDetails | null> {
		const res = await this.endpoint.findById(extrahourId);
		const data = res?.data
		if (!data) return null
		return this.adapter.onGet(data)
	}
}
