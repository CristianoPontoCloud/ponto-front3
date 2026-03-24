import type { Role } from "./role"
import type { TimeRegistersDto } from "./time-registers"
import type { User } from "./user"

export interface UserRoleIds {
  userId: string
  roleId: string
}

export interface UserRole extends TimeRegistersDto {
  userId: string,
  roleId: string,
  user: User,
  role: Role
}
