import type { ExportDownloadFormProps, ExportLayoutFormProps } from "@/domain/entities/exports/exports";

export const exportLayoutInitialFormValues: ExportLayoutFormProps = {
  name: "",
  footer: "",
  header: "",
  hourFormated: "",
  nightFactor: false,
  extraFactor: false,
  reportType: "",
  separatedDecimal: "",
  separatedFields: "",
  fields: [],
  events: [],
  companyId: "",
}

export const exportDownloadInitialFormValues: ExportDownloadFormProps = {
  exportLayoutId: "",
  dateFrom: null,
  dateTo: null,
  collaboratorIds: [],
  costCenterIds: [],
  departmentIds: [],
  positionIds: [],
  turnIds: [],
}
