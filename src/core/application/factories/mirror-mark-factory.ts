import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { MirrorMarkEndpoint } from "@/infra/apis/ponto-cloud-client-side/mirror-mark";
import { MirrorMarkFacade } from "../facades/mirror-mark-facade";
import { MirrorMarkFilteredUseCase } from "../usecases/mirror-mark/mirror-mark-filtered";
import { MirrorMarkGenerateUseCase } from "../usecases/mirror-mark/mirror-mark-generate";

export function mirrorMarkFacadeFactory(token: string): MirrorMarkFacade {
  const endpoint = new MirrorMarkEndpoint(createPontoCloudApi(token))
  const filteredUseCase = new MirrorMarkFilteredUseCase(endpoint)
  const generateUseCase = new MirrorMarkGenerateUseCase(endpoint)

  return new MirrorMarkFacade(filteredUseCase, generateUseCase)
}
