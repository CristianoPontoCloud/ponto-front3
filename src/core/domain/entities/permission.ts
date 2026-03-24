import type { StatusDefaultEnum } from "../usecases/status-default"
import type { TimeRegistersDto } from "./time-registers"

export enum AccessLevelEnum {
  READ = "READ",
  WRITE = "WRITE",
  FULL_ACCESS = "FULL_ACCESS",
  DENIED = "DENIED"
}

export interface ACLs {
  mode: "whitelist" | "blacklist"
  modules?: { name: string }[]
}

export interface Permission extends TimeRegistersDto {
  id: string,
  code: string,
  name: string,
  description: null,
  status: StatusDefaultEnum,
  accessLevel: AccessLevelEnum,
  isPreBuiltPermission: boolean,
  ACLs: ACLs
}
