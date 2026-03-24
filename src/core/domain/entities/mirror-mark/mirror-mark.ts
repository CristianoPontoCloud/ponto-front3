import type { ViewTypeEnum } from "@/domain/view-type"
import type { TimeRegistersDto } from "../time-registers"

export interface MirrorMark extends TimeRegistersDto {
  id: string
  periodTo: Date
  periodFrom: Date
  urlDownload: string
}

export interface MirrorMarkGenerate {
  companyId: string;
  collaboratorId?: string | null;
  from: string;
  to: string;
  tz: "America/Sao_Paulo";
  scope: ViewTypeEnum;
}
