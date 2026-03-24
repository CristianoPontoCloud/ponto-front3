import type {
	CollaboratorExtraTime,
	CollaboratorExtraTimeCreateParams,
	CollaboratorExtraTimeUpdateParams,
} from "@/domain/entities/collaborator/collaborator-extra-time";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAll = PaginationDto<CollaboratorExtraTime[]>;

interface CollaboratorExtraTimeEndPointDto {
	findAll(urlParams?: string): Promise<AxiosResponse<FindAll>>;
	findById(companyId: string): Promise<AxiosResponse<CollaboratorExtraTime>>;
	// filtered(urlParams?: string): Promise<AxiosResponse<void>>
	create(body: CollaboratorExtraTimeCreateParams): Promise<AxiosResponse<CollaboratorExtraTime>>;
	update(body: CollaboratorExtraTimeUpdateParams): Promise<AxiosResponse<CollaboratorExtraTime>>;
	delete(id: string): Promise<AxiosResponse<void>>;
}

export class CollaboratorExtraTimeEndpoint implements CollaboratorExtraTimeEndPointDto {
	constructor(private readonly client: HttpClient) { }
	private readonly endpoint = "register/collaborator-extra-time";

	async findAll(urlParams?: string): Promise<AxiosResponse<FindAll>> {
		return await this.client.get<FindAll>(`${this.endpoint}${urlParams ?? ""}`);
	}
	async findById(collaboratorExtraTimeId: string): Promise<AxiosResponse<CollaboratorExtraTime>> {
		return await this.client.get(`${this.endpoint}/${collaboratorExtraTimeId}`);
	}
	async create(
		body: CollaboratorExtraTimeCreateParams,
	): Promise<AxiosResponse<CollaboratorExtraTime>> {
		return await this.client.post<CollaboratorExtraTimeCreateParams, CollaboratorExtraTime>({
			body,
			url: this.endpoint,
		});
	}
	async update(
		body: CollaboratorExtraTimeUpdateParams,
	): Promise<AxiosResponse<CollaboratorExtraTime>> {
		return await this.client.put<CollaboratorExtraTimeUpdateParams, CollaboratorExtraTime>({
			body,
			url: `${this.endpoint}/${body.id}`,
		});
	}
	async delete(collaboratorExtraTimeId: string): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(`${this.endpoint}/${collaboratorExtraTimeId}`);
	}
}
