import type { EnrollmentPasswordResponse } from "@/domain/authentication/recovery-password"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface RecoveryPasswordMethodEndPointDto {
  post<Body>(body: Body): Promise<AxiosResponse<EnrollmentPasswordResponse>>
}

export class RecoveryPasswordMethodEndpoint implements RecoveryPasswordMethodEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'enrollment/forgot-password'

  async post<Body>(body: Body): Promise<AxiosResponse<EnrollmentPasswordResponse>> {
    return await this.client.post<Body, EnrollmentPasswordResponse>({ url: this.endpoint, body })
  }
}
