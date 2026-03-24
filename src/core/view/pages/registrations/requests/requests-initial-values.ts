import { type RequestFormProps, RequestTypeEnum } from "@/domain/entities/request";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const requestInitialFormValues: RequestFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  abbreviation: "",
  computeAs: "",
  discountDSR: false,
  makeAvailableCollaborator: false,
  type: RequestTypeEnum.ALL_DAY,
  companyId: ""
}
