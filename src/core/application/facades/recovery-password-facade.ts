import type { EnrollmentPasswordResponse, RecoveryPasswordFormProps, RecoveryPasswordWithEmailFormProps } from "@/domain/authentication/recovery-password";
import type { RecoveryPasswordEmailMethodUseCase } from "../usecases/enrollment/recovery-password-email-method";
import type { RecoveryPasswordUpdateUseCase } from "../usecases/enrollment/recovery-password-update";

interface RecoveryPasswordFacadeDto {
  email(body: RecoveryPasswordWithEmailFormProps): Promise<EnrollmentPasswordResponse | null>
  update(body: RecoveryPasswordFormProps): Promise<EnrollmentPasswordResponse | null>
}

export class RecoveryPasswordFacade implements RecoveryPasswordFacadeDto {
  constructor(
    private readonly emailUseCase: RecoveryPasswordEmailMethodUseCase,
    private readonly updateUseCase: RecoveryPasswordUpdateUseCase,
  ) { }
  async email(body: RecoveryPasswordWithEmailFormProps): Promise<EnrollmentPasswordResponse | null> {
    return await this.emailUseCase.execute(body)
  }
  async update(body: RecoveryPasswordFormProps) {
    return await this.updateUseCase.execute(body)
  }
}
