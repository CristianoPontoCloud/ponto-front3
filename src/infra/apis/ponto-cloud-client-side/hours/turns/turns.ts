import type { Turn, TurnWithCollaboratorsAndPolicy } from "@/domain/entities/turns/turns";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<TurnWithCollaboratorsAndPolicy[]>;
type FindAllFilteredResponse = PaginationDto<TurnWithCollaboratorsAndPolicy[]>;
type CreateTurn = CreateDto<Turn>;
type EditTurn = EditDto<Turn>;

interface TurnsEndPointDto {
	findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>;
	findById(workShiftId: string): Promise<AxiosResponse<Turn>>;
	filtered(urlParams?: string): Promise<AxiosResponse<FindAllFilteredResponse>>;
	create(body: CreateTurn): Promise<AxiosResponse<Turn>>;
	update(body: EditTurn): Promise<AxiosResponse<Turn>>;
	delete(workShiftId: string): Promise<AxiosResponse<void>>;
}

export class TurnsEndpoint implements TurnsEndPointDto {
	constructor(private readonly client: HttpClient) {}
	private readonly endpoint = "register/work-shift";
	async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ""}`);
	}
	async findById(workShiftId: string): Promise<AxiosResponse<TurnWithCollaboratorsAndPolicy>> {
		return await this.client.get<TurnWithCollaboratorsAndPolicy>(`${this.endpoint}/${workShiftId}`);
	}
	async filtered(urlParams?: string): Promise<AxiosResponse<FindAllFilteredResponse>> {
		return await this.client.get<FindAllFilteredResponse>(
			`${this.endpoint}/findAllFiltered${urlParams ?? ""}`,
		);
	}
	async create(body: CreateTurn): Promise<AxiosResponse<Turn>> {
		return await this.client.post<CreateTurn, Turn>({ body, url: `${this.endpoint}` });
	}
	async update(body: EditTurn): Promise<AxiosResponse<Turn>> {
		return await this.client.put<CreateTurn, Turn>({
			body,
			url: `${this.endpoint}/${body.id}`,
		});
	}
	async delete(workShiftId: string): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(`${this.endpoint}/${workShiftId}`);
	}
}
