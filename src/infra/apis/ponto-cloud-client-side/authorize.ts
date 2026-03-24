import type { LoginParams, LoginResponse } from "@/domain/authentication/signin"
import type { ResponseDto } from "@/domain/http/http-client"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type ResponseLogin = ResponseDto<LoginResponse>

interface AuthorizePointDto {
  login(body: LoginParams): Promise<AxiosResponse<ResponseLogin>>
  selectCompany(companyId: string): Promise<AxiosResponse<ResponseLogin>>
  getSessionMetadata(): Promise<AxiosResponse<ResponseLogin>>
}

export class AuthorizeEndpoint implements AuthorizePointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'session/'

  async login(body: LoginParams): Promise<AxiosResponse<ResponseLogin>> {
    return await this.client.post<LoginParams, ResponseLogin>({ url: 'login', body })
  }
  async selectCompany(companyId: string): Promise<AxiosResponse<ResponseLogin>> {
    return await this.client.post<{ companyId: string }, ResponseLogin>({ url: 'select-company', body: { companyId } })
  }
  async getSessionMetadata(): Promise<AxiosResponse<ResponseLogin>> {
    return await this.client.get<ResponseLogin>(`${this.endpoint}metadata`)
  }
}
