import { type TimeTrackingFormProps, TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import { endOfMonth, format, startOfMonth } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import type { TimeTrackingFormContextProps } from "./time-tracking-provider-type";
const newDate = new Date();
// const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
// const lastDay = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 1, 23, 59, 59, 999));
// lastDay.setUTCDate(lastDay.getUTCDate() + 1);

const firstDay = startOfMonth(newDate);
const lastDay = endOfMonth(newDate);

// newDate.setDate(1);
// newDate.setMonth(newDate.getMonth() + 1);
// lastDay.setDate(lastDay.getDate() - 1);
export const timetrackingContextInitialValues: TimeTrackingFormContextProps = {
  collaboratorId: "",
  dailyDate: new Date(),
  typeQueryState: "",
  setTypeQueryState: () => undefined,
  setDailyDate: () => undefined,
  monthlyDate: format(newDate, "yyyy-MM"),
  setMonthlyDate: () => undefined,
  dateFrom: undefined,
  setDateFrom: () => undefined,
  dateTo: undefined,
  setDateTo: () => undefined,
  search: "",
  setSearch: () => undefined,
  type: TimeTrackingTypeEnum.monthly,
  setType: () => undefined,
  headerForm: {} as UseFormReturn<TimeTrackingFormProps>,
  dailyIsLoading: true,
  monthlyIsLoading: true,
  timetrackingIsLoading: true,
  refetchGridValues: () => undefined,
  setDailyIsLoading: () => undefined,
  setMonthlyIsLoading: () => undefined,
  setTimetrackingIsLoading: () => undefined,
  monthlyResponse: [],
  setMonthlyResponse: () => undefined,
  timetrackingResponse: undefined,
  setTimetrackingResponse: () => undefined,
  isTypeDaily: false,
  isTypeMonthly: true,
  isTypeTimetracking: false,
  collaboratorsQuery: undefined,
  dailyResponse: undefined,
  setCollaborator: () => undefined,
  setDailyResponse: () => undefined,
};

export const timetrackingFormInitialValues: TimeTrackingFormProps = {
  collaboratorId: "",
  dailyDate: new Date(),
  monthlyDate: format(newDate, "yyyy-MM"),
  companyId: "",
  search: "",
  type: TimeTrackingTypeEnum.monthly,
  dateFrom: firstDay,
  dateTo: lastDay
}
