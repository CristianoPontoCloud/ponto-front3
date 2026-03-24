import type { HourBankFormProps } from "@/domain/entities/hour-bank";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const hourBankInitialFormValues: HourBankFormProps = {
  name: "",
  resetDBEveryXMonths: "",
  startDate: null,
  endDate: null,
  discountLateArrivals: false,
  discountEarlyDeparture: false,
  discountAbsences: false,
  status: StatusDefaultEnum.active,
  companyId: ""
};
