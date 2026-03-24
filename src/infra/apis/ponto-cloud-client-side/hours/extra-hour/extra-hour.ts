import type { ExtraHourDetailsNumberMultiplier } from "@/domain/entities/extra-hour/extra-hour";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { HttpClient } from "@/infra/http/http-client";
import type { AxiosResponse } from "axios";

type FindAllResponse = PaginationDto<ExtraHourDetailsNumberMultiplier[]>;
type CreateExtraHour = CreateDto<ExtraHourDetailsNumberMultiplier>;
type EditExtraHour = EditDto<ExtraHourDetailsNumberMultiplier>;

interface ExtraHoursEndPointDto {
	findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>;
	findById(extrahourId: string): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>>;
	filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>;
	create(body: CreateExtraHour): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>>;
	update(body: EditExtraHour): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>>;
	delete(positionId: string): Promise<AxiosResponse<void>>;
}

export class ExtraHoursEndpoint implements ExtraHoursEndPointDto {
	constructor(private readonly client: HttpClient) { }
	private readonly endpoint = "register/extra-time";
	async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ""}`);
	}
	async findById(extrahourId: string): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>> {
		return await this.client.get<ExtraHourDetailsNumberMultiplier>(`${this.endpoint}/${extrahourId}/complete`);
	}
	async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
		return await this.client.get<FindAllResponse>(
			`${this.endpoint}/findAllFiltered${urlParams ?? ""}`,
		);
	}
	async create(body: CreateExtraHour): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>> {
		return await this.client.post<CreateExtraHour, ExtraHourDetailsNumberMultiplier>({
			body,
			url: `${this.endpoint}/complete`,
		});
	}
	async update(body: EditExtraHour): Promise<AxiosResponse<ExtraHourDetailsNumberMultiplier>> {
		return await this.client.put<EditExtraHour, ExtraHourDetailsNumberMultiplier>({
			body,
			url: `${this.endpoint}/${body.id}/complete`,
		});
	}
	async delete(collaboratorId: string): Promise<AxiosResponse<void>> {
		return await this.client.delete<void>(`${this.endpoint}/${collaboratorId}`);
	}
}
