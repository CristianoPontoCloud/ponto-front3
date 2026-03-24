import type { ValueLabel } from "../value-label"
import type { Permission } from "./permission"
import type { Role } from "./role"
import type { TimeRegistersDto } from "./time-registers"

export interface RolePermission extends TimeRegistersDto {
  id: string,
  assignedAt: string,
  permission: Permission
  role: Role
}

export enum RoleSettingViewEnum {
  ROLES = "ROLES",
  ASSIGNMENTS = "ASSIGNMENTS"
}

export const RoleSettingViewOptions: ValueLabel[] = [
  { label: "Papéis", value: RoleSettingViewEnum.ROLES },
  { label: "Atribuições", value: RoleSettingViewEnum.ASSIGNMENTS },
];
