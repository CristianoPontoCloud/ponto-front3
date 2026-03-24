import type { ExtraHourDetails, ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import type { CreateDto } from "@/domain/http/http-client";
import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";
import { ExtraHourAdapter } from "./extra-hours-adapter";

export interface ExtraHoursCreatedUseCaseDto {
	execute(body: CreateDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null>;
}

export class ExtraHoursCreatedUseCase implements ExtraHoursCreatedUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	private adapter = new ExtraHourAdapter();
	async execute(body: CreateDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null> {
		const res = await this.endpoint.create(this.adapter.onCreate(body));
		const data = res?.data
		if (!data) return null
		return this.adapter.onGet(data)
	}
}
