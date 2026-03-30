import type { ScopeEnum } from "@/domain/scope"

export interface MirrorMark {
  id: string
  isCurrent: boolean
  periodTo: string
  periodFrom: string
}

export interface MirrorMarkGenerateParams {
  companyId: string;
  collaboratorId?: string | null;
  periods: {
    from: string;
    to: string;
  }[]
  tz: "America/Sao_Paulo";
  scope: ScopeEnum;
}
