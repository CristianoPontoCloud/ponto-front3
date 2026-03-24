import type { HolidayFormProps } from "@/domain/entities/holiday";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const holidayInitialFormValues: HolidayFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  date: null,
  collaboratorLinks: [],
  departmentLinks: [],
  repeatHolidaysAllYears: false,
  companyId: ""
}
