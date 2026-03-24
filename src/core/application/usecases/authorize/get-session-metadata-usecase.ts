import type { LoginResponse } from "@/domain/authentication/signin";
import type { ResponseDto } from "@/domain/http/http-client";
import type { AuthorizeEndpoint } from "@/infra/apis/ponto-cloud-client-side/authorize";

type ResponseLogin = ResponseDto<LoginResponse>

export interface GetSessionMetadataUseCaseDto {
  execute(): Promise<ResponseLogin | null>
}

export class GetSessionMetadataUseCase implements GetSessionMetadataUseCaseDto {
  constructor(private readonly endpoint: AuthorizeEndpoint) { }
  async execute(): Promise<ResponseLogin | null> {
    const response = await await this.endpoint.getSessionMetadata()
    if (!response.data) return null
    return response.data
  }
}
