import type { ResponseDto } from "../http/http-client"

export interface CnpjConfirmBody {
  cnpj: string
}

interface Response {
  cnpj: string
  maskedCnpj: string
  razaoSocial: string
  nomeFantasia: string
  situacaoCadastral: string
  inicioAtividade: string
}

export type CnpjConfirmResponse = ResponseDto<Response>
