import type {
	TurnPatternConfig,
	TurnPatternConfigCreateParams,
	TurnPatternConfigDeleteParams,
	TurnPatternConfigFindAllParams,
	TurnPatternConfigFindByIdParams,
	TurnPatternConfigUpdateParams,
} from "@/domain/entities/turns/turn-pattern-config";
import type { CreateDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<TurnPatternConfig[]>;
type CreateTurnPatternConfig = CreateDto<TurnPatternConfig>;

interface TurnPatternConfigEndPointDto {
	findAll({ urlParams }: TurnPatternConfigFindAllParams): Promise<AxiosResponse<FindAllResponse>>;
	findById({
		patternConfigId,
	}: TurnPatternConfigFindByIdParams): Promise<AxiosResponse<TurnPatternConfig>>;
	create({ body }: TurnPatternConfigCreateParams): Promise<AxiosResponse<TurnPatternConfig>>;
	update({ body }: TurnPatternConfigUpdateParams): Promise<AxiosResponse<TurnPatternConfig>>;
	delete({ patternConfigId }: TurnPatternConfigDeleteParams): Promise<AxiosResponse<void>>;
}

export class TurnPatternConfigEndpoint implements TurnPatternConfigEndPointDto {
	constructor(private readonly client: HttpClient) {}

	private endpoint = "register/work-shift-pattern-config";

	async findAll({
		urlParams,
	}: TurnPatternConfigFindAllParams): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint}/${urlParams ?? ""}`);
	}
	async findById({
		patternConfigId,
	}: TurnPatternConfigFindByIdParams): Promise<AxiosResponse<TurnPatternConfig>> {
		return await this.client.get<TurnPatternConfig>(`${this.endpoint}/${patternConfigId}`);
	}
	async create({ body }: TurnPatternConfigCreateParams): Promise<AxiosResponse<TurnPatternConfig>> {
		return await this.client.post<CreateTurnPatternConfig, TurnPatternConfig>({
			body,
			url: this.endpoint,
		});
	}
	async update({ body }: TurnPatternConfigUpdateParams): Promise<AxiosResponse<TurnPatternConfig>> {
		return await this.client.put<CreateTurnPatternConfig, TurnPatternConfig>({
			body,
			url: `${this.endpoint}/${body.id}`,
		});
	}
	async delete({ patternConfigId }: TurnPatternConfigDeleteParams): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(`${this.endpoint}/${patternConfigId}`);
	}
}
