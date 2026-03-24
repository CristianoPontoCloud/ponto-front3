import { SignupUseCase } from "@/application/usecases/enrollment/signup";
import { CnpjConfirmUseCase } from "@/application/usecases/enrollment/signup-cnpj-confirm";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CnpjConfirmEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/cnpj-confirm";
import { SignupEmailConfirmEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/signup-email-confirm-endpoint";
import { SignupEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/signup-endpoint";
import { SignupFacade } from "../../facades/signup-facade";
import { SignupEmailConfirmUseCase } from "../../usecases/enrollment/signup-email-cofirm";

export function signupFacadeFactory(): SignupFacade {
  const emailConfirmEndpoint = new SignupEmailConfirmEndpoint(createPontoCloudApi())
  const cnpjConfirmEndpoint = new CnpjConfirmEndpoint(createPontoCloudApi())
  const singupEndpoint = new SignupEndpoint(createPontoCloudApi())
  const singupUseCase = new SignupUseCase(singupEndpoint)
  const emailConfirmUseCase = new SignupEmailConfirmUseCase(emailConfirmEndpoint)
  const cnpjConfirmUseCase = new CnpjConfirmUseCase(cnpjConfirmEndpoint)
  return new SignupFacade(singupUseCase, emailConfirmUseCase, cnpjConfirmUseCase)
}
