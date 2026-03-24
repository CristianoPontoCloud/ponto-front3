export enum ExportFieldsEnum {
  DEFAULT = "default",
  TEXT = "text",
  DECIMAL = "decimal",
  DATE = "date"
}

export const exportFieldsEnumMap = [
  { name: "Número sequencial", type: ExportFieldsEnum.DEFAULT },
  { name: "Código do evento", type: ExportFieldsEnum.DECIMAL },
  { name: "Nome do evento", type: ExportFieldsEnum.DEFAULT },
  { name: "Texto fixo", type: ExportFieldsEnum.TEXT },
  { name: "Valor do evento", type: ExportFieldsEnum.DECIMAL },
  { name: "Data do evento", type: ExportFieldsEnum.DATE },
  { name: "Dia inicial", type: ExportFieldsEnum.DATE },
  { name: "Dia final", type: ExportFieldsEnum.DATE },
  { name: "Dias faltados", type: ExportFieldsEnum.DATE },
  { name: "ID da empresa", type: ExportFieldsEnum.DEFAULT },
  { name: "Nome da empresa", type: ExportFieldsEnum.DEFAULT },
  { name: "Nome fantasia da empresa", type: ExportFieldsEnum.DEFAULT },
  { name: "CNPJ da empresa", type: ExportFieldsEnum.DEFAULT },
  { name: "Inscrição estadual da empresa", type: ExportFieldsEnum.DEFAULT },
  { name: "Número da folha", type: ExportFieldsEnum.DEFAULT },
  { name: "ID do centro de custo", type: ExportFieldsEnum.DECIMAL },
  { name: "Nome do centro de custo", type: ExportFieldsEnum.DEFAULT },
  { name: "ID do departamento", type: ExportFieldsEnum.DEFAULT },
  { name: "Nome do departamento", type: ExportFieldsEnum.DEFAULT },
];

export interface ExportFieldDefault {
  type: ExportFieldsEnum
  name: string
  size: string
  startPosition: string
  endPosition: string
  fill: string
  align: string
}

export interface ExportFieldDecimal extends ExportFieldDefault {
  decimalPlaces: string
}

export interface ExportFieldDate extends ExportFieldDefault {
  format: string
}

export interface ExportFieldText extends Omit<ExportFieldDefault, 'fill' | 'align'> {
  text: string
}

export type ExportFields = ExportFieldDecimal
  | ExportFieldDate
  | ExportFieldText
  | ExportFieldDefault
