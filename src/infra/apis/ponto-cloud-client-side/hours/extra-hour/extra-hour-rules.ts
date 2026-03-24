import type { ExtraHourRulesNumberMultiplier } from "@/domain/entities/extra-hour/extra-hour-rules";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<ExtraHourRulesNumberMultiplier[]>;
type CreateExtraHour = CreateDto<ExtraHourRulesNumberMultiplier>;
type EditExtraHour = EditDto<ExtraHourRulesNumberMultiplier>;

interface ExtraHourRulesEndPointDto {
	findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>;
	findById(extrahourId: string): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>>;
	filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>;
	create(body: CreateExtraHour): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>>;
	update(body: EditExtraHour): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>>;
	delete(positionId: string): Promise<AxiosResponse<void>>;
}

export class ExtraHourRulesEndPoint implements ExtraHourRulesEndPointDto {
	constructor(private readonly client: HttpClient) { }
	private readonly endpoint = "register/extra-time-rules";
	async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ""}`);
	}
	async findById(extrahourId: string): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>> {
		return await this.client.get<ExtraHourRulesNumberMultiplier>(`${this.endpoint}/${extrahourId}`);
	}
	async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(
			`${this.endpoint}/findAllFiltered${urlParams ?? ""}`,
		);
	}
	async create(body: CreateExtraHour): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>> {
		return await this.client.post<CreateExtraHour, ExtraHourRulesNumberMultiplier>({
			body,
			url: `${this.endpoint}`,
		});
	}
	async update(body: EditExtraHour): Promise<AxiosResponse<ExtraHourRulesNumberMultiplier>> {
		return await this.client.put<EditExtraHour, ExtraHourRulesNumberMultiplier>({
			body,
			url: `${this.endpoint}/${body.id}`,
		});
	}
	async delete(collaboratorId: string): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(`${this.endpoint}/${collaboratorId}`);
	}
}
