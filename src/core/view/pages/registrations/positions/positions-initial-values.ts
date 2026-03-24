import type { PositionFormProps } from "@/domain/entities/positions";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const positionInitialFormValues: PositionFormProps = { name: "", status: StatusDefaultEnum.active, companyId: "" };
