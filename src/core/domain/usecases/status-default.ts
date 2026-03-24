import type { ValueLabel } from "../value-label";

export enum StatusDefaultEnum {
  active = "ACTIVE",
  inactive = "INACTIVE",
  any = "ANY"
}

export const statusDefaultList: ValueLabel[] = [
  {
    label: "Ativo",
    value: StatusDefaultEnum.active,
  },
  {
    label: "Inativo",
    value: StatusDefaultEnum.inactive,
  }
]

export const statusDefaultMap: Record<StatusDefaultEnum, ValueLabel> = {
  [`${StatusDefaultEnum.active}`]: {
    label: "Ativo",
    value: StatusDefaultEnum.active,
  },
  [`${StatusDefaultEnum.inactive}`]: {
    label: "Inativo",
    value: StatusDefaultEnum.inactive,
  },
  [`${StatusDefaultEnum.any}`]: {
    label: "Todos",
    value: StatusDefaultEnum.any,
  }
}


export function getStatus(status: StatusDefaultEnum) {
  return statusDefaultMap[status]
}

