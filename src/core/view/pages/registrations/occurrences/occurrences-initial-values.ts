import type { OccurrenceFormProps } from "@/domain/entities/occurrence";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const occurrenceInitialFormValues: OccurrenceFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  field: "",
  considerFrom: "",
  controllerOccurrence: false,
  companyId: "",
}
