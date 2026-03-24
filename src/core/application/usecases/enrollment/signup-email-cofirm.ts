import type { SignupEmailConfirmFormProps, SignupEmailConfirmResponse } from "@/domain/authentication/signup"
import type { SignupEmailConfirmEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/signup-email-confirm-endpoint"
export interface SignupEmailConfirmDto {
  execute(body: SignupEmailConfirmFormProps): Promise<SignupEmailConfirmResponse | null>
}
export class SignupEmailConfirmUseCase implements SignupEmailConfirmDto {
  constructor(private readonly endpoint: SignupEmailConfirmEndpoint) { }
  async execute(body: SignupEmailConfirmFormProps): Promise<SignupEmailConfirmResponse | null> {
    const response = await this.endpoint.post(body)
    return response?.data ?? null
  }
}
