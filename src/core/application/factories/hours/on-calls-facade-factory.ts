import { OnCallsFacade } from "@/application/facades/hours/on-calls-facade"
import { OnCallsCreatedUseCase } from "@/application/usecases/hours/on-calls/on-calls-create"
import { OnCallsDeleteUseCase } from "@/application/usecases/hours/on-calls/on-calls-delete"
import { OnCallsFilteredUseCase } from "@/application/usecases/hours/on-calls/on-calls-filtered"
import { OnCallsFindAllUseCase } from "@/application/usecases/hours/on-calls/on-calls-find-all"
import { OnCallsFindByIdUseCase } from "@/application/usecases/hours/on-calls/on-calls-find-by-id"
import { OnCallsUpdateUseCase } from "@/application/usecases/hours/on-calls/on-calls-update"
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api"
import { OnCallsEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/on-call"

export function oncallsFacadeFactory(token: string): OnCallsFacade {
  const endpoint = new OnCallsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new OnCallsFindAllUseCase(endpoint)
  const filteredUseCase = new OnCallsFilteredUseCase(endpoint)
  const findByIdUseCase = new OnCallsFindByIdUseCase(endpoint)
  const createUseCase = new OnCallsCreatedUseCase(endpoint)
  const updateUseCase = new OnCallsUpdateUseCase(endpoint)
  const deleteUseCase = new OnCallsDeleteUseCase(endpoint)

  return new OnCallsFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
