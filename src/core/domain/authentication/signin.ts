import type { StatusDefaultEnum } from "../usecases/status-default"

export interface SigninFormProps {
  identifier: string
  password: string
  stayConnected: boolean
}

export type LoginParams = SigninFormProps

export interface Headquarters {
  companyId: string,
  companyName: string,
  companyFantasyName: string,
  cnpj: string,
  collaboratorId: string,
  isHeadquarters: boolean
}
export interface Branches {
  companyId: string
  companyName: string
  companyFantasyName: string
  cnpj: string
  collaboratorId: string
  parentCompanyId: string
}

export interface CompanyGroup {
  headquarters: Headquarters,
  branches: Branches[],
  totalCollaboratorsInGroup: number
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  requiresCompanySelection: boolean,
  requiresPasswordSetup: boolean,
  user: {
    id: string,
    email: string,
    phone: string,
    cpf: string,
    username: string,
    status: StatusDefaultEnum
  },
  company: {
    id: string,
    name: string,
    fantasyName: string,
    cnpj: string,
    status: StatusDefaultEnum
    startDay: number
  },
  collaborator: {
    id: string,
    name: string,
    surname: string,
    email: string,
    cpf: string,
    phone: string,
    position: {
      id: string
      name: string
    },
    status: StatusDefaultEnum
  },
  companyGroups: CompanyGroup[],
  loginMetadata: {
    identifierType: string,
    identifierValue: string,
    loginMethod: string,
    timestamp: string
  }
}

export interface CompanyNameId {
  companyId: string
  companyName: string
}

export interface SessionData {
  username: string
  firstName: string
  lastName: string
  companyId: string
  email: string
  positionName: string
  parentCompanyId: string
  companyGroups: CompanyGroup[],
  /** Lista de empresas do usuário (ex.: multi-empresa); populada em alguns fluxos de login/sessão */
  companyList?: CompanyNameId[]
  collaboratorId: string | null,
  admin: string | null,
  hasCpf: boolean,
  origin: string,
  startDay: number
}
export interface TokenJWT extends SessionData {
  sub: string
  iat: number,
  exp: number,
}
export interface UserSession extends SessionData {
  id: string
  token: string
}
