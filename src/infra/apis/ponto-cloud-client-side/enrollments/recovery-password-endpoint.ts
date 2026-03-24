import type { EnrollmentPasswordResponse, RecoveryPasswordFormProps } from "@/domain/authentication/recovery-password"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface RecoveryPasswordEndPointDto {
  post(body: RecoveryPasswordFormProps): Promise<AxiosResponse<EnrollmentPasswordResponse>>
}

export class RecoveryPasswordEndpoint implements RecoveryPasswordEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'enrollment/password'

  async post(body: RecoveryPasswordFormProps): Promise<AxiosResponse<EnrollmentPasswordResponse>> {
    return await this.client.post<RecoveryPasswordFormProps, EnrollmentPasswordResponse>({ url: this.endpoint, body })
  }
}
