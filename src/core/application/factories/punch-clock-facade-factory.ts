import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { PunchClockEndpoint } from "@/infra/apis/ponto-cloud-client-side/punch-clock/punch";
import { PunchClockFacade } from "../facades/punch-clock-facade";
import { PunchCreateUseCase } from "../usecases/punch-clock/punch-create-use-case";

export function punchClockFacadeFactory(token: string): PunchClockFacade {
  const endpoint = new PunchClockEndpoint(createPontoCloudApi(token))
  const punchCreateUseCase = new PunchCreateUseCase(endpoint)

  return new PunchClockFacade(punchCreateUseCase)
}
