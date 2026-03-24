import type { EnrollmentPasswordResponse, RecoveryPasswordWithEmailFormProps } from "@/domain/authentication/recovery-password"
import type { RecoveryPasswordMethodEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/recovery-password-method-endpoint"


export interface RecoveryPasswordEmailMethodDto {
  execute(body: RecoveryPasswordWithEmailFormProps): Promise<EnrollmentPasswordResponse | null>
}

export class RecoveryPasswordEmailMethodUseCase implements RecoveryPasswordEmailMethodDto {
  constructor(private readonly endpoint: RecoveryPasswordMethodEndpoint) { }
  async execute(body: RecoveryPasswordWithEmailFormProps): Promise<EnrollmentPasswordResponse | null> {
    const response = await this.endpoint.post<RecoveryPasswordWithEmailFormProps>(body)
    return response?.data ?? null
  }
}
