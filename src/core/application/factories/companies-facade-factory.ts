import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";
import { CompaniesFacade } from "../facades/companies-facade";
import { CompaniesCreatedUseCase } from "../usecases/companies/companies-create";
import { CompaniesDeleteUseCase } from "../usecases/companies/companies-delete";
import { CompaniesFilteredUseCase } from "../usecases/companies/companies-filtered";
import { CompaniesFindAllUseCase } from "../usecases/companies/companies-find-all";
import { CompaniesFindByIdUseCase } from "../usecases/companies/companies-find-by-id";
import { CompaniesUpdateUseCase } from "../usecases/companies/companies-update";

export function companiesFacadeFactory(token: string): CompaniesFacade {
  const endpoint = new CompaniesEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new CompaniesFindAllUseCase(endpoint)
  const filteredUseCase = new CompaniesFilteredUseCase(endpoint)
  const findByIdUseCase = new CompaniesFindByIdUseCase(endpoint)
  const createUseCase = new CompaniesCreatedUseCase(endpoint)
  const updateUseCase = new CompaniesUpdateUseCase(endpoint)
  const deleteUseCase = new CompaniesDeleteUseCase(endpoint)

  return new CompaniesFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
