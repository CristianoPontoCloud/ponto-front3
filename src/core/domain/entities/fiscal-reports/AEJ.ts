export interface AEJFormProps {
  companyId: string,
  periodStart: Date | null
  periodEnd: Date | null
  turns: string[]
  departments: string[]
  positions: string[]
  costcenters: string[]
  collaborators: string[]
}

export interface GenerateAEJParams extends Omit<AEJFormProps, "periodEnd" | "periodStart"> {
  periodEnd: string
  periodStart: string
}

export interface AEJGenereationResponse {
  exportId: string
  publicUrl: string
  signatureUrl: string
  fileSha256: string
  queryFingerprint: string
}
