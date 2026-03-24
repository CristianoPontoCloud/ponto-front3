import { HolidaysFacade } from "@/application/facades/registrations/holidays-facade";
import { HolidaysCreatedUseCase } from "@/application/usecases/registrations/holidays/holidays-create";
import { HolidaysDeleteUseCase } from "@/application/usecases/registrations/holidays/holidays-delete";
import { HolidaysFilteredUseCase } from "@/application/usecases/registrations/holidays/holidays-filtered";
import { HolidaysFindAllUseCase } from "@/application/usecases/registrations/holidays/holidays-find-all";
import { HolidaysFindByIdUseCase } from "@/application/usecases/registrations/holidays/holidays-find-by-id";
import { HolidaysUpdateUseCase } from "@/application/usecases/registrations/holidays/holidays-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { HolidaysEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/holidays";

export function holidaysFacadeFactory(token: string): HolidaysFacade {
  const endpoint = new HolidaysEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new HolidaysFindAllUseCase(endpoint)
  const filteredUseCase = new HolidaysFilteredUseCase(endpoint)
  const findByIdUseCase = new HolidaysFindByIdUseCase(endpoint)
  const createUseCase = new HolidaysCreatedUseCase(endpoint)
  const updateUseCase = new HolidaysUpdateUseCase(endpoint)
  const deleteUseCase = new HolidaysDeleteUseCase(endpoint)

  return new HolidaysFacade(findAllUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
