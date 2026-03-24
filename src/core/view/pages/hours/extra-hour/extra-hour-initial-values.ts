import type { ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const extraHourInitialFormValues: ExtraHourFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  rules: [],
  companyId: "",
};
