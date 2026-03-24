import type {
	TurnPeriod,
	TurnPeriodCreateParams,
	TurnPeriodDeleteParams,
	TurnPeriodFindAllParams,
	TurnPeriodFindByIdParams,
	TurnPeriodUpdateParams,
} from "@/domain/entities/turns/turn-period";
import type { CreateDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<TurnPeriod[]>;
type CreateTurnPeriod = CreateDto<TurnPeriod>;

interface TurnPeriodEndPointDto {
	findAll({ urlParams }: TurnPeriodFindAllParams): Promise<AxiosResponse<FindAllResponse>>;
	findById({ periodId }: TurnPeriodFindByIdParams): Promise<AxiosResponse<TurnPeriod>>;
	create({ body }: TurnPeriodCreateParams): Promise<AxiosResponse<TurnPeriod>>;
	update({ body }: TurnPeriodUpdateParams): Promise<AxiosResponse<TurnPeriod>>;
	delete({ periodId }: TurnPeriodDeleteParams): Promise<AxiosResponse<void>>;
}

export class TurnPeriodEndpoint implements TurnPeriodEndPointDto {
	constructor(
		private readonly client: HttpClient,
		private readonly turnId: string,
		private readonly dayId: string,
	) {}
	private endpoint(periodId?: string) {
		const withDayId = periodId ? `/${periodId}` : "";
		return `register/work-shift/${this.turnId}/day/${this.dayId}/period${withDayId}`;
	}
	async findAll({ urlParams }: TurnPeriodFindAllParams): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint()}/${urlParams ?? ""}`);
	}
	async findById({ periodId }: TurnPeriodFindByIdParams): Promise<AxiosResponse<TurnPeriod>> {
		return await this.client.get<TurnPeriod>(this.endpoint(periodId));
	}
	async create({ body }: TurnPeriodCreateParams): Promise<AxiosResponse<TurnPeriod>> {
		return await this.client.post<CreateTurnPeriod, TurnPeriod>({
			body,
			url: this.endpoint(),
		});
	}
	async update({ body }: TurnPeriodUpdateParams): Promise<AxiosResponse<TurnPeriod>> {
		return await this.client.put<CreateTurnPeriod, TurnPeriod>({
			body,
			url: this.endpoint(body.id),
		});
	}
	async delete({ periodId }: TurnPeriodDeleteParams): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(this.endpoint(periodId));
	}
}
