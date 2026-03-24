import { decodeJWT } from "@/domain/global-helpers/decode-jwt"
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { SysConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/sys-config"
import { SysConfigFacade } from "../facades/sys-config"
import { createIndexedDbConection } from "../indexed-db/indexed-db"
import { SysConfigLoadAndSaveParametersUseCase } from "../usecases/sys-config/load-and-save-sys-config-parameters"
import { SysConfigFindParametersUseCase } from "../usecases/sys-config/sys-config-find-parameter"

export function sysConfigFacadeFactory(token: string): SysConfigFacade {
  const endpoint = new SysConfigEndpoint(createPontoCloudApi(token))
  const findParametersUseCase = new SysConfigFindParametersUseCase(endpoint)
  const loadAndSaveParametersUseCase = new SysConfigLoadAndSaveParametersUseCase(
    findParametersUseCase,
    createIndexedDbConection,
    token,
    decodeJWT
  )

  return new SysConfigFacade(findParametersUseCase, loadAndSaveParametersUseCase)
}
