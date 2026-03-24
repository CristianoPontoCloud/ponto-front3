import type { ValueLabel } from "../value-label";

export enum CNHEnum {
  ACC = 'ACC',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  AB = 'AB',
  AC = 'AC',
  AD = 'AD',
  AE = 'AE',
  ACCA = 'ACC+A',
  ACCB = 'ACC+B',
  ACCAB = 'ACC+AB',
  ACCAC = 'ACC+AC',
  ACCAD = 'ACC+AD',
  ACCAE = 'ACC+AE',
}

export const CNHList: ValueLabel[] = [
  { label: 'A', value: CNHEnum.A },
  { label: 'B', value: CNHEnum.B },
  { label: 'C', value: CNHEnum.C },
  { label: 'D', value: CNHEnum.D },
  { label: 'E', value: CNHEnum.E },
  { label: 'AB', value: CNHEnum.AB },
  { label: 'AC', value: CNHEnum.AC },
  { label: 'AD', value: CNHEnum.AD },
  { label: 'AE', value: CNHEnum.AE },
  { label: 'ACC', value: CNHEnum.ACC },
  { label: 'ACC + A', value: CNHEnum.ACCA },
  { label: 'ACC + B', value: CNHEnum.ACCB },
  { label: 'ACC + AB', value: CNHEnum.ACCAB },
  { label: 'ACC + AC', value: CNHEnum.ACCAC },
  { label: 'ACC + AD', value: CNHEnum.ACCAD },
  { label: 'ACC + AE', value: CNHEnum.ACCAE },
] 
