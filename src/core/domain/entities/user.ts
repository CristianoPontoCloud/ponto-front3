import type { StatusDefaultEnum } from "../usecases/status-default"
import type { TimeRegistersDto } from "./time-registers"
import type { UserRoleIds } from "./user-role"

export interface User extends TimeRegistersDto {
  id: string,
  username: string,
  phone: string | null,
  email: string | null,
  status: StatusDefaultEnum,
  isCompanyAdmin: string | null,
  isResellerAdmin: string | null,
  lastLogin: string | null,
  lastAccessedCompany: string | null,
  userRoleIds: UserRoleIds[]
}
