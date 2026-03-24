export enum IrregularitiesTypeEnum {
  MY = "MY",
  COMPANY = "COMPANY",
}

export interface IrregularitiesFormProps {
  dateTo: Date | null
  dateFrom: Date | null
  type: IrregularitiesTypeEnum
  search: string
}
