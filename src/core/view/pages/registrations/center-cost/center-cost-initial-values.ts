import type { CostCenterFormProps } from "@/domain/entities/center-cost";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const costCenterInitialFormValues: CostCenterFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  companyId: ""
}
