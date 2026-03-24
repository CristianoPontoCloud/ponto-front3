import type { CnpjConfirmBody, CnpjConfirmResponse } from "@/domain/authentication/cnpj-confirm";
import type { SignupEmailConfirmFormProps, SignupEmailConfirmResponse, SignupFormProps, SignupResponse } from "@/domain/authentication/signup";
import type { SignupUseCase } from "../usecases/enrollment/signup";
import type { CnpjConfirmUseCase } from "../usecases/enrollment/signup-cnpj-confirm";
import type { SignupEmailConfirmUseCase } from "../usecases/enrollment/signup-email-cofirm";

interface SignupFacadeDto {
  emailCofirm(body: SignupEmailConfirmFormProps): Promise<SignupEmailConfirmResponse | null>
  cnpjCofirm(body: CnpjConfirmBody): Promise<CnpjConfirmResponse | null>
  singup(body: SignupFormProps): Promise<SignupResponse | null>
}

export class SignupFacade implements SignupFacadeDto {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly emailCofirmUseCase: SignupEmailConfirmUseCase,
    private readonly cnpjCofirmUseCase: CnpjConfirmUseCase,
  ) { }
  async emailCofirm(body: SignupEmailConfirmFormProps): Promise<SignupEmailConfirmResponse | null> {
    return await this.emailCofirmUseCase.execute(body)
  }
  async cnpjCofirm(body: CnpjConfirmBody): Promise<CnpjConfirmResponse | null> {
    return await this.cnpjCofirmUseCase.execute(body)
  }
  async singup(body: SignupFormProps): Promise<SignupResponse | null> {
    return await this.signupUseCase.execute(body)
  }
}
