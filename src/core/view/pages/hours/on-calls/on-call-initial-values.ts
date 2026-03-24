import type { OnCallFormProps } from "@/domain/entities/on-call";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const onCallInitialFormValues: OnCallFormProps = {
  name: "",
  // date: null,
  companyId: "",
  initialDate: null,
  finalDate: null,
  initialTime: "",
  finalTime: "",
  obs: "",
  type: "1",
  collaboratorIds: [],
  turnIds: [],
  departmentIds: [],
  status: StatusDefaultEnum.active,
};
