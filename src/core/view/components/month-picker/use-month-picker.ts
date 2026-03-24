import { getValueLabelMonth, monthsList, yearAndMonthRegex } from "@/domain/global-helpers/time-tools"
import type { ValueLabel } from "@/domain/value-label"
import { useState } from "react"
import type { FieldValues, Path, PathValue } from "react-hook-form"

interface UseMonthPickerParams<T extends FieldValues> {
  // form: UseFormReturn<T>
  // formFieldName: Path<T>
  value: PathValue<T, Path<T>>
  onChangeMonth: (value: string) => void;
}

export function monthPickerInitialValueYear(value: string) {
  const currentYear = new Date().getFullYear()
  if (value === '') return currentYear
  if (!yearAndMonthRegex.test(value)) return currentYear
  const splitedDate = value.split('-')
  return Number(splitedDate[0])
}

export function monthPickerInitialValueMonth(value: string) {
  const m = (new Date().getMonth() + 1).toString().padStart(2, '0');
  if (value === '') return getValueLabelMonth(m)
  if (!yearAndMonthRegex.test(value)) return getValueLabelMonth(m)
  const splitedDate = value.split('-')
  return getValueLabelMonth(splitedDate[1])
}
export const monthPickerFullMonthNames = {
  Jan: "Janeiro",
  Fev: "Fevereiro",
  Mar: "Março",
  Abr: "Abril",
  Mai: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Ago: "Agosto",
  Set: "Setembro",
  Out: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro",
};
export function useMonthPicker<T extends FieldValues>({ value, onChangeMonth }: UseMonthPickerParams<T>) {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState<number>(monthPickerInitialValueYear(value))
  const [month, setMonth] = useState<ValueLabel>(monthPickerInitialValueMonth(value))
  const isMaxYear = year === currentYear
  const isMinYear = year === 1900

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()

  function isSelectedMonth(value: string) {
    if (value !== month.value) return false
    return true
  }
  function goToNextYear() {
    if (year === currentYear) return
    setYear(year + 1)
    // form.trigger(formFieldName)
  }
  function goToPreviousYear() {
    if (year === 1900) return
    setYear(year - 1)
    // form.trigger(formFieldName)
  }
  function invalidDate(index: number) {
    return currentMonth + 1 < Number(monthsList[index].value) && currentYear <= year
  }
  function changeMonth(index: number) {

    if (invalidDate(index)) return
    const newMonth = monthsList[index]
    setMonth(newMonth)

    const newDate = `${year}-${newMonth.value}`
    onChangeMonth(newDate)
    setMonth(monthsList[index])
  }

  return {
    goToNextYear,
    goToPreviousYear,
    monthsList,
    changeMonth,
    month,
    year,
    isSelectedMonth,
    isMaxYear,
    isMinYear,
    invalidDate,
    monthPickerFullMonthNames
  }
}
