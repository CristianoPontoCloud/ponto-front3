import type { SignupEmailConfirmFormProps, SignupEmailConfirmResponse } from "@/domain/authentication/signup"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface SignupEmailConfirmEndPointDto {
  post(body: SignupEmailConfirmFormProps): Promise<AxiosResponse<SignupEmailConfirmResponse>>
}

export class SignupEmailConfirmEndpoint implements SignupEmailConfirmEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'enrollment/email'

  async post(body: SignupEmailConfirmFormProps): Promise<AxiosResponse<SignupEmailConfirmResponse>> {
    return await this.client.post<SignupEmailConfirmFormProps, SignupEmailConfirmResponse>({ url: this.endpoint, body })
  }
}
