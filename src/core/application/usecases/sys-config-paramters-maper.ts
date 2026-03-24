import type { KeyCodeValue, SysConfigParameters } from "@/domain/entities/sys-config";
import type { ValueLabel } from "@/domain/value-label";

type KeyCodeValueArrayKeys = {
  [K in keyof SysConfigParameters]: SysConfigParameters[K] extends KeyCodeValue[] ? K : never
}[keyof SysConfigParameters];
interface SysConfigEnumAdaptersParams {
  field: KeyCodeValueArrayKeys
  parameters: SysConfigParameters | null
}
export function sysConfigEnumAdapters({ field, parameters }: SysConfigEnumAdaptersParams): ValueLabel[] {
  return parameters?.[field].map(
    ({ code, value }): ValueLabel => ({
      value: code.toString(),
      label: value,
    })) ?? []
}
