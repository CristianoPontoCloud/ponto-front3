export enum MarkStatusEnum {
  normal = 'NORMAL',
  manual = 'MANUAL',
  missing = 'MISSING',
  dayoff = 'DAYOFF',
  // mark = 'MARK',
  med = 'MED',
  dent = 'DENT',
}
export type MarkType = "include" | "exclude" | "disconsider" | "reconsider";

export type EntryAndOutKey = `entry${number}` | `out${number}`;

export interface MarkEntriesAndOutsDetails {
  value?: string
  status?: MarkStatusEnum
  justify?: string
  responsible?: string
  idMark?: string
}

export type MarkEntriesAndOutsDetailsRequired = Required<MarkEntriesAndOutsDetails>

export type MarkEntriesAndOutsRecord = Record<EntryAndOutKey, MarkEntriesAndOutsDetails>;

export interface MarkDetailsFields {
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

export type MarkUserColumnsRenderPreference = Record<keyof MarkDetailsFields, boolean>
