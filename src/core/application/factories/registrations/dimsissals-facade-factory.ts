import { DismissalsCreatedUseCase } from "@/application/usecases/registrations/dismissals/dismissals-create";
import { DismissalsDeleteUseCase } from "@/application/usecases/registrations/dismissals/dismissals-delete";
import { DismissalsFilteredUseCase } from "@/application/usecases/registrations/dismissals/dismissals-filtered";
import { DismissalsUpdateUseCase } from "@/application/usecases/registrations/dismissals/dismissals-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals";
import { DismissalsFacade } from "../../facades/registrations/dismissals-facade";
import { DismissalsFindAllUseCase } from "../../usecases/registrations/dismissals/dismissals-find-all";
import { DismissalsFindByIdUseCase } from "../../usecases/registrations/dismissals/dismissals-find-by-id";

export function dismissalsFacadeFactory(token: string): DismissalsFacade {
  const endpoint = new DismissalsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new DismissalsFindAllUseCase(endpoint)
  const filteredUseCase = new DismissalsFilteredUseCase(endpoint)
  const findByIdUseCase = new DismissalsFindByIdUseCase(endpoint)
  const createUseCase = new DismissalsCreatedUseCase(endpoint)
  const updateUseCase = new DismissalsUpdateUseCase(endpoint)
  const deleteUseCase = new DismissalsDeleteUseCase(endpoint)

  return new DismissalsFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
