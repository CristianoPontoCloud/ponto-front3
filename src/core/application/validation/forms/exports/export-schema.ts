import { z } from "zod";

const fieldsSharedInAllItems = {
  type: z.string().min(1),
  name: z.string().min(1),
  size: z.string().min(1),
  startPosition: z.string().min(1),
  endPosition: z.string().min(1),
}
const fillAndAlign = {
  fill: z.string().min(1),
  align: z.string().min(1),
}
const decimalPlaces = {
  decimalPlaces: z.string().min(1),
}
const date = {
  format: z.string().min(1),
}
const text = {
  text: z.string().min(1),
}

const fieldDefault = z.object({
  ...fieldsSharedInAllItems,
  ...fillAndAlign
})
const fieldDecimal = z.object({
  ...fieldsSharedInAllItems,
  ...fillAndAlign,
  ...decimalPlaces
})
const fieldDate = z.object({
  ...fieldsSharedInAllItems,
  ...fillAndAlign,
  ...date
})
const fieldText = z.object({
  ...fieldsSharedInAllItems,
  ...fillAndAlign,
  ...text
})
const fieldSchema = z.union([
  fieldDefault,
  fieldDecimal,
  fieldDate,
  fieldText
]);
const eventSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  fill: z.string().min(1),
  align: z.string().min(1),
  decimals: z.string().min(1),
})

export const exportLayoutSchema = z.object({
  name: z.string().min(3),
  id: z.string().optional().nullable(),
  footer: z.string().optional().nullable(),
  header: z.string().optional().nullable(),
  separatedFields: z.string().optional().nullable(),
  separatedDecimal: z.string().optional().nullable(),
  reportType: z.string().optional().nullable(),
  hourFormated: z.string().optional().nullable(),
  extraFactor: z.boolean().optional().nullable(),
  nightFactor: z.boolean().optional().nullable(),
  fields: z.array(fieldSchema).min(1),
  events: z.array(eventSchema).min(1)
})


export const exportDownloadSchema = z.object({
  exportLayoutId: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
  collaboratorIds: z.array(z.string()).min(1),
  positionIds: z.array(z.string().optional()),
  costCenterIds: z.array(z.string().optional()),
  turnIds: z.array(z.string().optional()),
  departmentIds: z.array(z.string().min(3)),
})
