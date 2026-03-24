import { PositionsCreatedUseCase } from "@/application/usecases/registrations/positions/positions-create";
import { PositionsDeleteUseCase } from "@/application/usecases/registrations/positions/positions-delete";
import { PositionsFilteredUseCase } from "@/application/usecases/registrations/positions/positions-filtered";
import { PositionsFindAllPreBuiltUseCase } from "@/application/usecases/registrations/positions/positions-find-all-pre-built";
import { PositionsUpdateUseCase } from "@/application/usecases/registrations/positions/positions-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { PositionsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/positions";
import { PositionsFacade } from "../../facades/registrations/positions-facade";
import { PositionsFindAllUseCase } from "../../usecases/registrations/positions/positions-find-all";
import { PositionsFindByIdUseCase } from "../../usecases/registrations/positions/positions-find-by-id";

export function positionsFacadeFactory(token: string): PositionsFacade {
  const endpoint = new PositionsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new PositionsFindAllUseCase(endpoint)
  const findAllPreBuiltUseCase = new PositionsFindAllPreBuiltUseCase(endpoint)
  const filteredUseCase = new PositionsFilteredUseCase(endpoint)
  const findByIdUseCase = new PositionsFindByIdUseCase(endpoint)
  const createUseCase = new PositionsCreatedUseCase(endpoint)
  const updateUseCase = new PositionsUpdateUseCase(endpoint)
  const deleteUseCase = new PositionsDeleteUseCase(endpoint)

  return new PositionsFacade(findAllUseCase, findAllPreBuiltUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
