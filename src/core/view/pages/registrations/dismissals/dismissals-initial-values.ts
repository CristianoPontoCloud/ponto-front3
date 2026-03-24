import type { DismissalFormProps } from "@/domain/entities/dismissal";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const dismissalInitialFormValues: DismissalFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  applicant: "",
  companyId: ""
}
