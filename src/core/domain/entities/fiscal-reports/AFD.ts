export interface AFDFormProps {
  periodStart: Date | null
  periodEnd: Date | null
  requesterId: string
  repDeviceId: string
  turns: string[]
  departments: string[]
  positions: string[]
  costcenters: string[]
  collaborators: string[]
  companyId: string
}

export interface GenerateAFDParams extends Omit<AFDFormProps, "periodEnd" | "periodStart"> {
  periodEnd: string
  periodStart: string
}

export interface AFDGenereationResponse {
  exportId: string
  publicUrl: string
  signatureUrl: string
  fileSha256: string
  queryFingerprint: string
}
