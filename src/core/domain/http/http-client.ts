import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface PostParams<Body> {
	url: string;
	body: Body;
	config?: AxiosRequestConfig;
}
export interface PutParams<Body> {
	url: string;
	body: Body;
	config?: AxiosRequestConfig;
}
export interface PatchParams<Body> {
	url: string;
	body: Body;
	config?: AxiosRequestConfig;
}

export interface HttpClientMetods {
	get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
	post<Body, Response>({ url, body, config }: PostParams<Body>): Promise<AxiosResponse<Response>>;
	put<Body, Response>({ url, body, config }: PutParams<Body>): Promise<AxiosResponse<Response>>;
	patch<Body, Response>({ url, body, config }: PatchParams<Body>): Promise<AxiosResponse<Response>>;
	// delete<T>(url: string, config?: any): Promise<T>;
}

export interface FilteredParamsDto {
	name?: string;
	page?: string;
	limit?: string;
	status?: string;
	date?: string;
	startDate?: string;
	endDate?: string;
	dateFrom?: string;
	dateTo?: string;
	from?: string;
	to?: string;
	year?: string;
	companyId?: string;
	parentCompanyId?: string;
	hourBankId?: string;
	collaboratorId?: string;
	scope?: string;
}

export interface FilteredParamsWithCollaboratorId {
	urlParams?: string;
	collaboratorId: string;
}
export interface FilteredParamsWithCompanyId {
	urlParams?: string;
	companyId: string;
}

export type CreateDto<T> = Omit<T, "id">;
// export type EditDto<T extends { id?: string }> =
//   Partial<Omit<T, 'id'>> & Required<Pick<T, 'id'>>;
export type EditDto<T> = T extends { id?: string | undefined } ? Omit<T, "id"> & { id: string } : T;

interface Error {
	message: string;
	statusCode: number;
	path: string;
	timestamp: string;
}

export interface ResponseDto<Data> {
	success: boolean;
	data?: Data;
	error?: Error;
}

export interface WebSocketResponse {
	message: string;
	reqId: string;
	socketChannel: string;
}
