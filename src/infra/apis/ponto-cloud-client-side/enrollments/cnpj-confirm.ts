import type { CnpjConfirmBody, CnpjConfirmResponse } from "@/domain/authentication/cnpj-confirm"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface CnpjConfirmEndPointDto {
  post(body: CnpjConfirmBody): Promise<AxiosResponse<CnpjConfirmResponse>>
}

export class CnpjConfirmEndpoint implements CnpjConfirmEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'enrollment/cnpj'

  async post(body: CnpjConfirmBody): Promise<AxiosResponse<CnpjConfirmResponse>> {
    return await this.client.post<CnpjConfirmBody, CnpjConfirmResponse>({ url: this.endpoint, body })
  }
}
