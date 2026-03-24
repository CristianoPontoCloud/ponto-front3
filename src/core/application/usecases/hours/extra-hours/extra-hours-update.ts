import type { ExtraHourDetails, ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import type { EditDto } from "@/domain/http/http-client";
import type { ExtraHoursEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/extra-hour/extra-hour";
import { ExtraHourAdapter } from "./extra-hours-adapter";

export interface ExtraHoursUpdateUseCaseDto {
	execute(body: EditDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null>;
}

export class ExtraHoursUpdateUseCase implements ExtraHoursUpdateUseCaseDto {
	constructor(private readonly endpoint: ExtraHoursEndpoint) { }
	private adapter = new ExtraHourAdapter();

	async execute(body: EditDto<ExtraHourFormProps>): Promise<ExtraHourDetails | null> {
		const res = await this.endpoint.update(this.adapter.onUpdate(body));
		const data = res?.data
		if (!data) return null
		return this.adapter.onGet(data)
	}
}
