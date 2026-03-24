import type {
	TurnPolicy,
	TurnPolicyCreateParams,
	TurnPolicyDeleteParams,
	TurnPolicyFindAllParams,
	TurnPolicyFindByIdParams,
	TurnPolicyUpdateParams,
} from "@/domain/entities/turns/turn-policy";
import type { CreateDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<TurnPolicy[]>;
type CreateTurnPolicy = CreateDto<TurnPolicy>;

interface TurnPolicyEndPointDto {
	findAll({ urlParams }: TurnPolicyFindAllParams): Promise<AxiosResponse<FindAllResponse>>;
	findById({ policyId }: TurnPolicyFindByIdParams): Promise<AxiosResponse<TurnPolicy>>;
	create({ body }: TurnPolicyCreateParams): Promise<AxiosResponse<TurnPolicy>>;
	update({ body }: TurnPolicyUpdateParams): Promise<AxiosResponse<TurnPolicy>>;
	delete({ policyId }: TurnPolicyDeleteParams): Promise<AxiosResponse<void>>;
}

export class TurnPolicyEndpoint implements TurnPolicyEndPointDto {
	constructor(
		private readonly client: HttpClient,
		private readonly turnId: string,
	) {}
	private endpoint(policyId?: string) {
		const withPolicyId = policyId ? `/${policyId}` : "";
		return `register/work-shift/${this.turnId}/policy${withPolicyId}`;
	}
	async findAll({ urlParams }: TurnPolicyFindAllParams): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint()}/${urlParams ?? ""}`);
	}
	async findById({ policyId }: TurnPolicyFindByIdParams): Promise<AxiosResponse<TurnPolicy>> {
		return await this.client.get<TurnPolicy>(this.endpoint(policyId));
	}
	async create({ body }: TurnPolicyCreateParams): Promise<AxiosResponse<TurnPolicy>> {
		return await this.client.post<CreateTurnPolicy, TurnPolicy>({
			body,
			url: this.endpoint(),
		});
	}
	async update({ body }: TurnPolicyUpdateParams): Promise<AxiosResponse<TurnPolicy>> {
		return await this.client.put<CreateTurnPolicy, TurnPolicy>({
			body,
			url: this.endpoint(body.id),
		});
	}
	async delete({ policyId }: TurnPolicyDeleteParams): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(this.endpoint(policyId));
	}
}
