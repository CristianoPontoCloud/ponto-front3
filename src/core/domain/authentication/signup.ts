import type { ResponseDto } from "../http/http-client"
import type { StatusDefaultEnum } from "../usecases/status-default"

export interface SignupEmailConfirmFormProps {
  email: string
}

export interface SignupEmailConfirmResponse {
  success: boolean,
  data: {
    email: string
  },
  message: string
}

export interface SignupFormProps {
  email: string,
  password: string,
  confirmPassword: string,
  phone: string
  cnpj: string,
  firstName: string,
  lastName: string,
  fantasyName: string,
  planId: string,
  companySize: string,
  positionId: string
}
export interface SignupBody extends SignupFormProps {
  name: string
  company: string
  password: string
  cnpj: string,
  confirmPassword: string,
  email: string
  responsibleName: string
  resellerId: string
  status: StatusDefaultEnum
  isReseller: boolean
}


export type SignupResponse = ResponseDto<{ token: string }>
