import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { AuthorizeEndpoint } from "@/infra/apis/ponto-cloud-client-side/authorize";
import { AuthorizeFacade } from "../facades/authorize-facade";
import { ChangeCompanyContextUseCase } from "../usecases/authorize/change-context-usecase";
import { GetSessionMetadataUseCase } from "../usecases/authorize/get-session-metadata-usecase";
import { LoginUseCase } from "../usecases/authorize/login-usecase";

export function authorizeFacadeFactory(token?: string): AuthorizeFacade {
  const endpoint = new AuthorizeEndpoint(createPontoCloudApi(token ?? ""))
  const loginUseCase = new LoginUseCase(endpoint)
  const selectCompanyUseCase = new ChangeCompanyContextUseCase(endpoint)
  const getSessionMetadataUseCase = new GetSessionMetadataUseCase(endpoint)
  return new AuthorizeFacade(loginUseCase, selectCompanyUseCase, getSessionMetadataUseCase)
}
