import type { LoginParams, LoginResponse } from "@/domain/authentication/signin";
import type { ResponseDto } from "@/domain/http/http-client";
import type { AuthorizeEndpoint } from "@/infra/apis/ponto-cloud-client-side/authorize";

type ResponseLogin = ResponseDto<LoginResponse>

export interface LoginUseCaseDto {
  execute(params: LoginParams): Promise<ResponseLogin | null>
}

export class LoginUseCase implements LoginUseCaseDto {
  constructor(private readonly endpoint: AuthorizeEndpoint) { }
  async execute(body: LoginParams): Promise<ResponseLogin | null> {
    const response = await await this.endpoint.login(body)
    if (!response.data) return null
    // const { accessToken, refreshToken } = response
    // const token = body.stayConnected ? refreshToken : accessToken;
    // const decodedToken = decodeJWT<TokenJWT>(token ?? "");
    // if (!decodedToken) return null

    // return {
    //   ...decodedToken,
    //   token,
    //   id: decodedToken.sub
    // }
    return response.data
  }
}
