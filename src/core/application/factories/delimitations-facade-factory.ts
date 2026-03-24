import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations";
import { DelimitationsFacade } from "../facades/delimitations-facade";
import { DelimitationsCreatedUseCase } from "../usecases/delimitations/delimitation-create";
import { DelimitationsDeleteUseCase } from "../usecases/delimitations/delimitation-delete";
import { DelimitationsFindAllByCompanyIdUseCase } from "../usecases/delimitations/delimitation-find-all-by-company-id";
import { DelimitationsFindByIdUseCase } from "../usecases/delimitations/delimitation-find-by-id";
import { DelimitationsUpdateUseCase } from "../usecases/delimitations/delimitation-update";

export function delimitationsFacadeFactory(token: string): DelimitationsFacade {
  const endpoint = new DelimitationsEndpoint(createPontoCloudApi(token))
  const findAllByCompanyIdUseCase = new DelimitationsFindAllByCompanyIdUseCase(endpoint)
  const updateUseCase = new DelimitationsUpdateUseCase(endpoint)
  const createUseCase = new DelimitationsCreatedUseCase(endpoint)
  const deleteUseCase = new DelimitationsDeleteUseCase(endpoint)
  const findByIdUseCase = new DelimitationsFindByIdUseCase(endpoint)
  return new DelimitationsFacade(
    createUseCase,
    updateUseCase,
    findAllByCompanyIdUseCase,
    findByIdUseCase,
    deleteUseCase,
  )
}
