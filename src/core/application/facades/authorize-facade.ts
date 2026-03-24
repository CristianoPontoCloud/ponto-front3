import type { LoginParams, LoginResponse } from "@/domain/authentication/signin";
import type { ResponseDto } from "@/domain/http/http-client";
import type { ChangeCompanyContextUseCaseDto } from "../usecases/authorize/change-context-usecase";
import type { GetSessionMetadataUseCaseDto } from "../usecases/authorize/get-session-metadata-usecase";
import type { LoginUseCaseDto } from "../usecases/authorize/login-usecase";

type ResponseLogin = ResponseDto<LoginResponse>

interface AuthorizeFacadeDto {
  login(body: LoginParams): Promise<ResponseLogin | null>
  selectCompany(companyId: string): Promise<ResponseLogin | null>
  getSessionMetadata(): Promise<ResponseLogin | null>
}

export class AuthorizeFacade implements AuthorizeFacadeDto {
  constructor(
    private readonly loginUseCase: LoginUseCaseDto,
    private readonly changeCompanyContextUseCase: ChangeCompanyContextUseCaseDto,
    private readonly getSessionMetadataUseCase: GetSessionMetadataUseCaseDto,
  ) { }

  async login(body: LoginParams): Promise<ResponseLogin | null> {
    return await this.loginUseCase.execute(body)
  }
  async selectCompany(companyId: string): Promise<ResponseLogin | null> {
    return await this.changeCompanyContextUseCase.execute(companyId)
  }
  async getSessionMetadata(): Promise<ResponseLogin | null> {
    return await this.getSessionMetadataUseCase.execute()
  }
}
