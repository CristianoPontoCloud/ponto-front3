import type { EnrollmentPasswordResponse, RecoveryPasswordFormProps } from "@/domain/authentication/recovery-password"
import type { RecoveryPasswordEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/recovery-password-endpoint"
export interface RecoveryPasswordUpdateDto {
  execute(body: RecoveryPasswordFormProps): Promise<EnrollmentPasswordResponse | null>
}
export class RecoveryPasswordUpdateUseCase implements RecoveryPasswordUpdateDto {
  constructor(private readonly endpoint: RecoveryPasswordEndpoint) { }
  async execute(body: RecoveryPasswordFormProps): Promise<EnrollmentPasswordResponse | null> {
    const response = await this.endpoint.post(body)
    return response?.data ?? null
  }
}
