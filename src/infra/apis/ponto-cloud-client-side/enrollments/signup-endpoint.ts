import type { SignupBody, SignupResponse } from "@/domain/authentication/signup"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

// interface ParsedSingupBody extends Omit<SignupFormProps, "companySize"> {
//   companySize: number
// }

interface SignupEndPointDto {
  post(body: SignupBody): Promise<AxiosResponse<SignupResponse>>
}

export class SignupEndpoint implements SignupEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'enrollment'

  async post(body: SignupBody): Promise<AxiosResponse<SignupResponse>> {
    return await this.client.post<SignupBody, SignupResponse>({ url: this.endpoint, body })
  }
}
