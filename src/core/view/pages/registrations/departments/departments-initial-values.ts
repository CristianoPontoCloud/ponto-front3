import { type DepartmentFormProps, approvalFlowTypeEnum } from "@/domain/entities/department";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const departmentInitialFormValues: DepartmentFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  approvalFlow: false,
  approvalFlowType: approvalFlowTypeEnum.PARALLEL,
  usersForApproval: [],
  fakeGPS: false,
  geographicalDelimitation: false,
  offlineMarkings: false,
  requests: false,
  unrecognizedPhoto: false,
  companyId: "",
  selectUser: []
}
