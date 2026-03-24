import type { CnpjConfirmBody, CnpjConfirmResponse } from "@/domain/authentication/cnpj-confirm"
import type { CnpjConfirmEndpoint } from "@/infra/apis/ponto-cloud-client-side/enrollments/cnpj-confirm"
export interface CnpjConfirmDto {
  execute(body: CnpjConfirmBody): Promise<CnpjConfirmResponse | null>
}
export class CnpjConfirmUseCase implements CnpjConfirmDto {
  constructor(private readonly endpoint: CnpjConfirmEndpoint) { }
  async execute(body: CnpjConfirmBody): Promise<CnpjConfirmResponse | null> {
    const response = await this.endpoint.post(body)
    return response?.data ?? null
  }
}
