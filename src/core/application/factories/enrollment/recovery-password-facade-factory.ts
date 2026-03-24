import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { RecoveryPasswordEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/recovery-password-endpoint";
import { RecoveryPasswordMethodEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/recovery-password-method-endpoint";
import { RecoveryPasswordFacade } from "../../facades/recovery-password-facade";
import { RecoveryPasswordEmailMethodUseCase } from "../../usecases/enrollment/recovery-password-email-method";
import { RecoveryPasswordUpdateUseCase } from "../../usecases/enrollment/recovery-password-update";

export function recoveryPasswordFacadeFactory(token?: string): RecoveryPasswordFacade {
  const pontoCloudApi = createPontoCloudApi(token)
  const recoveryPasswordMethodEntpoint = new RecoveryPasswordMethodEndpoint(pontoCloudApi)
  const recoveryPasswordEntpoint = new RecoveryPasswordEndpoint(pontoCloudApi)
  const emailUseCase = new RecoveryPasswordEmailMethodUseCase(recoveryPasswordMethodEntpoint)
  const updateUseCase = new RecoveryPasswordUpdateUseCase(recoveryPasswordEntpoint)

  return new RecoveryPasswordFacade(emailUseCase, updateUseCase)
}
