import type { MarkDetailsFields } from "./marks";

type FieldsThatUserCanChooseRender = Pick<MarkDetailsFields,
  'hrDaytime' |
  'hrTotalDaytime' |
  'hrTotalWorked' |
  'hrExpectedHours' |
  'hrNight' |
  'hrTotalNight' |
  'hrInterval' |
  'hrEarlyOut' |
  'hrMissings' |
  'hrDelay' |
  'hrDaytimeDelayInterval' |
  'hrNightDelayTotal' |
  'hrDelayTotal' |
  'hrEarlyEntry' |
  'hrTotalExtraDaytime' |
  'hrTotalExtraNight' |
  'hrTotalExtra'
>

export type MarkFieldsUserPreferenceFormProp = Record<
  keyof FieldsThatUserCanChooseRender, boolean
>
