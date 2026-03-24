export enum MarkTurnEditTypeDateChangeEnum {
  specificDays = '1',
  startingFromDay = '2',
}

export interface MarkTurnEditFormProps {
  turn: string
  typeDateChange: MarkTurnEditTypeDateChangeEnum
  dtStart: Date | null
}
