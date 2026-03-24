import { type TimeTrackingFormProps, TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { timetrackingFormInitialValues } from "./timetracking-context-initial-values";
export function useTimeTrackingProviderForm() {
  const session = useSession();
  const user = session.data?.user;
  const startDay = session.data?.user.startDay ?? 1;
  const companyId = user?.companyId ?? "";
  const defaultValues = useMemo(() => ({
    ...timetrackingFormInitialValues,
    companyId
  }), [companyId]);
  const headerForm = useForm<TimeTrackingFormProps>({
    mode: "onChange",
    values: defaultValues,
  });
  const { setValue, trigger, control, getValues } = headerForm;
  const type = useWatch({
    control: control,
    name: "type",
  });
  const isTypeDaily = type === TimeTrackingTypeEnum.daily;
  const isTypeMonthly = type === TimeTrackingTypeEnum.monthly;
  const isTypeTimetracking = type === TimeTrackingTypeEnum.timetracking;
  const dailyDate = getValues("dailyDate");
  const monthlyDate = getValues("monthlyDate");
  const dateFrom = getValues("dateFrom");
  const dateTo = getValues("dateTo");
  const search = getValues("search");
  const collaboratorId = getValues("collaboratorId");
  function setDailyDate(value: Date | null) {
    setValue("dailyDate", value);
  }
  function setMonthlyDate(value: string) {
    setValue("monthlyDate", value);
  }
  function setDateFrom(value: Date | null) {
    setValue("dateFrom", value);
  }
  function setDateTo(value: Date | null) {
    setValue("dateTo", value);
  }
  function setType(value: TimeTrackingTypeEnum) {
    setValue("type", value);
  }
  function setSearch(value: string) {
    setValue("search", value);
  }
  useEffect(() => {
    if (type !== TimeTrackingTypeEnum.timetracking) return;

    const today = new Date();
    const currentDay = today.getDate();

    let newDateFrom: Date | null = null;
    let newDateTo: Date | null = null;

    const isPrevMonth = startDay > currentDay;

    if (isPrevMonth) {
      const previousMonth = new Date(today);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      newDateFrom = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        startDay
      );
      newDateTo = today;
    } else {
      newDateFrom = new Date(today.getFullYear(), today.getMonth(), startDay);
      newDateTo = new Date();
    }

    if (!newDateFrom || !newDateTo) return;

    setValue("dateFrom", newDateFrom);
    setValue("dateTo", newDateTo);

    trigger("dateFrom");
    trigger("dateTo");

  }, [startDay, type, setValue, trigger]);
  return {
    type,
    dailyDate,
    search,
    setDailyDate,
    monthlyDate,
    dateFrom,
    dateTo,
    setType,
    setSearch,
    setMonthlyDate,
    setDateFrom,
    setDateTo,
    headerForm,
    isTypeDaily,
    isTypeMonthly,
    isTypeTimetracking,
    collaboratorId
  }
}
export type UseTimeTrackingProviderFormReturn = ReturnType<typeof useTimeTrackingProviderForm>
