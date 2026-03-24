import type { EntryAndOutKey, MarkStatusEnum } from "../../marks/marks"

export interface IrregularitiesFields {
  hrDaytime: string
  hrTotalDaytime: string
  hrTotalWorked: string
  hrExpectedHours: string
  hrNight: string
  hrTotalNight: string
  hrEarlyOut: string
  hrEarlyEntry: string
  hrMissings: string
  hrDelay: string
  hrDelayInterval: string
  hrDelayEntry: string
  hrDaytimeDelayInterval: string
  hrNightDelayTotal: string
  hrDelayTotal: string
  hrAllowance: string
  hrInterval: string
  hrEntry50PercentDaytime: string
  hrEntry50PercentNight: string
  hrEntry60PercentDaytime: string
  hrEntry60PercentNight: string
  hrEntry100PercentDaytime: string
  hrEntry100PercentNight: string
  hrTotalExtraDaytime: string
  hrTotalExtraNight: string
  hrTotalExtra: string
  hrExtraInterval: string
  hrEntryAdvance: string
  hrDsrConsider: string
  hrDsrDebited: string
  hrBankCredDebt: string
  hrBankMonth: string
  hrBankBalance: string
  desconsiderMarks?: string
}

export const IRREGULARITIES_HOUR_FIELD_LABELS: IrregularitiesFields = {
  hrDaytime: 'Diurnas normais',
  hrTotalDaytime: 'Total normais',
  hrTotalWorked: 'Total trabalhado',
  hrExpectedHours: 'Horas previstas',
  hrNight: 'Noturnas normais',
  hrTotalNight: 'Total noturno',
  hrEarlyOut: 'Saída antecipada',
  hrEarlyEntry: 'Entrada antecipada',
  hrMissings: 'Horas falta',
  hrDelay: 'Horas atraso',
  hrDelayInterval: 'Atraso intervalo',
  hrDelayEntry: 'Atraso entrada',
  hrDaytimeDelayInterval: 'Horas atraso diurna',
  hrNightDelayTotal: 'Horas atraso noturna',
  hrDelayTotal: 'Horas atraso total',
  hrAllowance: 'Abono',
  hrInterval: 'Intervalo',
  hrEntry50PercentDaytime: 'Entra 50% diurna',
  hrEntry50PercentNight: 'Entra 50% noturna',
  hrEntry60PercentDaytime: 'Extra 60% diurna',
  hrEntry60PercentNight: 'Extra 60% noturna',
  hrEntry100PercentDaytime: 'Extra 100% diurna',
  hrEntry100PercentNight: 'Extra 100% noturna',
  hrTotalExtraDaytime: 'Total extra diurna',
  hrTotalExtraNight: 'Total extra noturna',
  hrTotalExtra: 'Total extras',
  hrExtraInterval: 'Total intervalo',
  hrEntryAdvance: 'Entrada antecipada',
  hrDsrConsider: 'DSR considerar',
  hrDsrDebited: 'DSR debitada',
  hrBankCredDebt: 'Banco Cred/Debito',
  hrBankMonth: 'Banco mês',
  hrBankBalance: 'Banco saldo',
  desconsiderMarks: 'Exclusões'
}

export interface IrregularitiesFieldsWithEntries extends IrregularitiesEntriesAndOutsRecord, IrregularitiesFields { }

export interface IrregularitiesEntriesAndOutsDetails {
  value?: string
  status?: MarkStatusEnum
  justify?: string
  responsible?: string
  idMark?: string
}

export type IrregularitiesEntriesAndOutsDetailsRequired = Required<IrregularitiesEntriesAndOutsDetails>;

export type IrregularitiesEntriesAndOutsRecord = Record<EntryAndOutKey, IrregularitiesEntriesAndOutsDetails>;

export type IrregularitiesUserColumnsRenderPreference = Record<keyof IrregularitiesFields, boolean>


