import { PlansFacade } from "@/application/facades/plans-facade";
import { PlansFindAllPreBuiltUseCase } from "@/application/usecases/plan/plan-find-all-pre-built";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { PlanEndpoint } from "@/infra/apis/ponto-cloud-client-side/plan";

export function plansFacadeFactory(token: string): PlansFacade {
  const endpoint = new PlanEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new PlansFindAllPreBuiltUseCase(endpoint)
  return new PlansFacade(findAllUseCase)
}
