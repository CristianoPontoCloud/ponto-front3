import type { LoginResponse } from "@/domain/authentication/signin";
import type { ResponseDto } from "@/domain/http/http-client";
import type { AuthorizeEndpoint } from "@/infra/apis/ponto-cloud-client-side/authorize";

type ResponseLogin = ResponseDto<LoginResponse>

export interface ChangeCompanyContextUseCaseDto {
  execute(companyId: string): Promise<ResponseLogin | null>
}

export class ChangeCompanyContextUseCase implements ChangeCompanyContextUseCaseDto {
  constructor(private readonly endpoint: AuthorizeEndpoint) { }
  async execute(companyId: string): Promise<ResponseLogin | null> {
    const response = await this.endpoint.selectCompany(companyId)
    if (!response) return null
    return response.data
  }
}
