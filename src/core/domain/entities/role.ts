import type { StatusDefaultEnum } from "../usecases/status-default"
import type { TimeRegistersDto } from "./time-registers"
import type { UserRoleIds } from "./user-role"

export interface Role extends TimeRegistersDto {
  id: string,
  name: string,
  description: string | null,
  isSystemRole: boolean,
  status: StatusDefaultEnum,
  roleType: "ADMIN",
  userRoleIds: UserRoleIds[],
  rolePermissionIds: string[]
}
