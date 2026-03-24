import { OccurrencesFacade } from "@/application/facades/registrations/occurrences-facade";
import { OccurrencesCreatedUseCase } from "@/application/usecases/registrations/occurrences/occurrences-create";
import { OccurrencesDeleteUseCase } from "@/application/usecases/registrations/occurrences/occurrences-delete";
import { OccurrencesFilteredUseCase } from "@/application/usecases/registrations/occurrences/occurrences-filtered";
import { OccurrencesFindAllUseCase } from "@/application/usecases/registrations/occurrences/occurrences-find-all";
import { OccurrencesFindByIdUseCase } from "@/application/usecases/registrations/occurrences/occurrences-find-by-id";
import { OccurrencesUpdateUseCase } from "@/application/usecases/registrations/occurrences/occurrences-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { OccurrencesEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/occurrences";

export function occurrencesFacadeFactory(token: string): OccurrencesFacade {
  const endpoint = new OccurrencesEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new OccurrencesFindAllUseCase(endpoint)
  const filteredUseCase = new OccurrencesFilteredUseCase(endpoint)
  const findByIdUseCase = new OccurrencesFindByIdUseCase(endpoint)
  const createUseCase = new OccurrencesCreatedUseCase(endpoint)
  const updateUseCase = new OccurrencesUpdateUseCase(endpoint)
  const deleteUseCase = new OccurrencesDeleteUseCase(endpoint)

  return new OccurrencesFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
