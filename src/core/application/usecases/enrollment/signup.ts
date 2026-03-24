import type { SignupFormProps, SignupResponse } from "@/domain/authentication/signup"
import { StatusDefaultEnum } from "@/domain/usecases/status-default"
import type { SignupEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/signup-endpoint"
export interface SignupUseCaseDto {
  execute(body: SignupFormProps): Promise<SignupResponse | null>
}
export class SignupUseCase implements SignupUseCaseDto {
  constructor(private readonly endpoint: SignupEndpoint) { }
  async execute(body: SignupFormProps): Promise<SignupResponse | null> {
    const {
      fantasyName,
      firstName,
      lastName,
    } = body
    const response = await this.endpoint.post({
      ...body,
      company: fantasyName,
      name: fantasyName,
      status: StatusDefaultEnum.active,
      responsibleName: `${firstName} ${lastName}`,
      resellerId: "",
      isReseller: false
    })
    return response?.data ?? null
  }
}
