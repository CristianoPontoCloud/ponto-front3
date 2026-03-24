import type {
	TurnDay,
	TurnDayCreateParams,
	TurnDayDeleteParams,
	TurnDayFindAllParams,
	TurnDayFindByIdParams,
	TurnDayUpdateParams,
} from "@/domain/entities/turns/turn-day";
import type { CreateDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<TurnDay[]>;
type CreateTurnDay = CreateDto<TurnDay>;

interface TurnDayEndPointDto {
	findAll({ urlParams }: TurnDayFindAllParams): Promise<AxiosResponse<FindAllResponse>>;
	findById({ dayId }: TurnDayFindByIdParams): Promise<AxiosResponse<TurnDay>>;
	create({ body }: TurnDayCreateParams): Promise<AxiosResponse<TurnDay>>;
	update({ body }: TurnDayUpdateParams): Promise<AxiosResponse<TurnDay>>;
	delete({ dayId }: TurnDayDeleteParams): Promise<AxiosResponse<void>>;
}

export class TurnDayEndpoint implements TurnDayEndPointDto {
	constructor(
		private readonly client: HttpClient,
		private readonly turnId: string,
	) {}
	private endpoint(dayId?: string) {
		const withDayId = dayId ? `/${dayId}/` : "";
		return `register/work-shift/${this.turnId}/day${withDayId}`;
	}
	async findAll({ urlParams }: TurnDayFindAllParams): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint()}/${urlParams ?? ""}`);
	}
	async findById({ dayId }: TurnDayFindByIdParams): Promise<AxiosResponse<TurnDay>> {
		return await this.client.get<TurnDay>(this.endpoint(dayId));
	}
	async create({ body }: TurnDayCreateParams): Promise<AxiosResponse<TurnDay>> {
		return await this.client.post<CreateTurnDay, TurnDay>({
			body,
			url: this.endpoint(),
		});
	}
	async update({ body }: TurnDayUpdateParams): Promise<AxiosResponse<TurnDay>> {
		return await this.client.put<CreateTurnDay, TurnDay>({
			body,
			url: this.endpoint(body.id),
		});
	}
	async delete({ dayId }: TurnDayDeleteParams): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(this.endpoint(dayId));
	}
}
