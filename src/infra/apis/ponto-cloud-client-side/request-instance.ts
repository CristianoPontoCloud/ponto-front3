import type {
	RequestInstance,
	RequestInstanceDetails,
} from "@/domain/entities/request-instance/request-instance";
import type {
	CreateDto,
	EditDto,
	FilteredParamsWithCollaboratorId,
	FilteredParamsWithCompanyId,
} from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { BodyWithId } from "@/domain/shared/body-with-id";
import type { JustificationDto } from "@/domain/shared/justification";
import type { ReasonDto } from "@/domain/shared/reason";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type PaginationRequestInstance = PaginationDto<RequestInstanceDetails[]>;
type CreateRequestInstance = CreateDto<RequestInstance>;
type EditRequestInstance = EditDto<RequestInstance>;

interface RequestInstanceEndpointDto {
	create(params: CreateDto<RequestInstance>): Promise<AxiosResponse<RequestInstanceDetails>>;
	filtered(urlParams?: string): Promise<AxiosResponse<PaginationRequestInstance>>;
	findAllPending(
		params: FilteredParamsWithCompanyId,
	): Promise<AxiosResponse<PaginationRequestInstance>>;
	findAllByCollaborator(
		params: FilteredParamsWithCollaboratorId,
	): Promise<AxiosResponse<PaginationRequestInstance>>;
	findById(id: string): Promise<AxiosResponse<RequestInstanceDetails>>;
	update(body: EditRequestInstance): Promise<AxiosResponse<RequestInstanceDetails>>;
	delete(id: string): Promise<AxiosResponse<void>>;
	approve(params: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>>;
	reject(params: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>>;
	cancel(params: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>>;
	reason(params: BodyWithId<ReasonDto>): Promise<AxiosResponse<void>>;
}

export class RequestInstanceEndpoint implements RequestInstanceEndpointDto {
	constructor(private readonly client: HttpClient) {}
	private readonly endpoint = "register/request-instance";

	async create(body: CreateRequestInstance): Promise<AxiosResponse<RequestInstanceDetails>> {
		return await this.client.post<CreateRequestInstance, RequestInstanceDetails>({
			url: this.endpoint,
			body,
		});
	}
	async filtered(urlParams?: string): Promise<AxiosResponse<PaginationRequestInstance>> {
		const response = await this.client.get<PaginationRequestInstance>(
			`${this.endpoint}/findAllFiltered${urlParams ?? ""}`,
		);

		return response;
	}
	async findAllPending({
		companyId,
		urlParams,
	}: FilteredParamsWithCompanyId): Promise<AxiosResponse<PaginationRequestInstance>> {
		return await this.client.get<PaginationRequestInstance>(
			`${this.endpoint}/pending/${companyId}${urlParams ?? ""}`,
		);
	}
	async findAllByCollaborator({
		collaboratorId,
		urlParams,
	}: FilteredParamsWithCollaboratorId): Promise<AxiosResponse<PaginationRequestInstance>> {
		return await this.client.get<PaginationRequestInstance>(
			`${this.endpoint}/collaborator/${collaboratorId}${urlParams ?? ""}`,
		);
	}
	async findById(id: string): Promise<AxiosResponse<RequestInstanceDetails>> {
		return await this.client.get<RequestInstanceDetails>(`${this.endpoint}/${id}`);
	}
	async update(body: EditRequestInstance): Promise<AxiosResponse<RequestInstanceDetails>> {
		return await this.client.put<EditRequestInstance, RequestInstanceDetails>({
			url: `${this.endpoint}/${body.id}`,
			body,
		});
	}
	async delete(id: string): Promise<AxiosResponse<void>> {
		return await this.client.delete(id);
	}
	async approve({ body, id }: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>> {
		return await this.client.post<JustificationDto, void>({
			url: `${this.endpoint}/${id}/approve`,
			body,
		});
	}
	async reject({ body, id }: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>> {
		return await this.client.post<JustificationDto, void>({
			url: `${this.endpoint}/${id}/reject`,
			body,
		});
	}
	async cancel({ body, id }: BodyWithId<JustificationDto>): Promise<AxiosResponse<void>> {
		return await this.client.post<JustificationDto, void>({
			url: `${this.endpoint}/${id}/cancel`,
			body,
		});
	}
	async reason({ body, id }: BodyWithId<ReasonDto>): Promise<AxiosResponse<void>> {
		return await this.client.post<ReasonDto, void>({
			url: `${this.endpoint}/${id}/reason`,
			body,
		});
	}
}
