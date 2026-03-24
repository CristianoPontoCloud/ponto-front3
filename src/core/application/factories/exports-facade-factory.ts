import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { ExportFacade } from "../facades/exports-facade"

export function exportsFacadeFactory(token: string): ExportFacade {
  createPontoCloudApi(token)
  return new ExportFacade()
}
