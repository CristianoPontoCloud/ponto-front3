import type { EquipmentFormProps } from "@/domain/entities/equipment";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const equipmentInitialFormValues: EquipmentFormProps = {
  name: "",
  status: StatusDefaultEnum.active,
  user: "",
  password: "",
  ip: "",
  port: "",
  serialNumber: "",
  is671: true,
  markId: "",
  modelId: "",
  companyId: ""
}
