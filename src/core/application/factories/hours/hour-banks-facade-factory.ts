import { HourBanksFacade } from "@/application/facades/hours/hour-banks-facade";
import { HourBanksCreatedUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-create";
import { HourBanksDeleteUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-delete";
import { HourBanksFilteredUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-filtered";
import { HourBanksFindAllUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-find-all";
import { HourBanksFindByIdUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-find-by-id";
import { HourBanksUpdateUseCase } from "@/application/usecases/hours/hour-banks/hour-banks-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { HourBanksEndpoint } from "@/infra/apis/ponto-cloud-client-side/hours/hour-banks";

export function hourBanksFacadeFactory(token: string): HourBanksFacade {
  const endpoint = new HourBanksEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new HourBanksFindAllUseCase(endpoint)
  const filteredUseCase = new HourBanksFilteredUseCase(endpoint)
  const findByIdUseCase = new HourBanksFindByIdUseCase(endpoint)
  const createUseCase = new HourBanksCreatedUseCase(endpoint)
  const updateUseCase = new HourBanksUpdateUseCase(endpoint)
  const deleteUseCase = new HourBanksDeleteUseCase(endpoint)

  return new HourBanksFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}

