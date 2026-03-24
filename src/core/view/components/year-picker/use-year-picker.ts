import { useState } from "react";

interface UseYearPickerParams {
  yearValue: number;
}

function getUnidade(num: number): number {
  return Math.abs(num) % 10;
}

export function useYearPicker({ yearValue }: UseYearPickerParams) {
  const currentYear = new Date().getFullYear()
  const [yearBaseList, setYearBaseList] = useState<number>(currentYear - getUnidade(currentYear))
  const yearList = Array.from({ length: 9 }).map((_, index) => yearBaseList + index)
  const yearMin = yearList[0]
  const yearMax = yearList.at(-1)

  function isSelectedYear(year: number) {
    return year === yearValue
  }

  function goToNextYear() {
    setYearBaseList(yearBaseList + 9)
  }
  function goToPreviousYear() {
    setYearBaseList(yearBaseList - 9)
  }
  function invalidDate(value: number) {
    return new Date().getFullYear() < value
  }


  return {
    goToNextYear,
    goToPreviousYear,
    yearList,
    yearMin,
    yearMax,
    isSelectedYear,
    invalidDate
  }
}
