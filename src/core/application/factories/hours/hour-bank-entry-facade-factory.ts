import { HourBankEntryFacade } from "@/application/facades/hours/hour-bank-entry-facade";
import { HourBankEntryCreatedUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-create";
import { HourBankEntryCreatedBulkUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-create-bulk";
import { HourBankEntryDeleteUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-delete";
import { HourBankEntryFilteredUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-filtered";
import { HourBankEntryFindAllUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-find-all";
import { HourBankEntryFindByIdUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-find-by-id";
import { HourBankEntryUpdateUseCase } from "@/application/usecases/hours/hour-bank-entry/hour-bank-entry-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { HourBankEntryEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-bank-entry";

export function hourBankEntryFacadeFactory(token: string): HourBankEntryFacade {
  const endpoint = new HourBankEntryEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new HourBankEntryFindAllUseCase(endpoint)
  const filteredUseCase = new HourBankEntryFilteredUseCase(endpoint)
  const findByIdUseCase = new HourBankEntryFindByIdUseCase(endpoint)
  const createUseCase = new HourBankEntryCreatedUseCase(endpoint)
  const createBulkjUseCase = new HourBankEntryCreatedBulkUseCase(endpoint)
  const updateUseCase = new HourBankEntryUpdateUseCase(endpoint)
  const deleteUseCase = new HourBankEntryDeleteUseCase(endpoint)

  return new HourBankEntryFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, createBulkjUseCase, updateUseCase, deleteUseCase)
}

