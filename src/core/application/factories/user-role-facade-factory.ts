import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { UserRoleEndpoint } from "@/infra/apis/ponto-cloud-client-side/user-role";
import { UserRoleFacade } from "../facades/user-role";
import { UserRoleFindAllUseCase } from "../usecases/user-role/user-role-find-all";
import { UserRoleUpdateUseCase } from "../usecases/user-role/user-role-update";

export function userRoleFacadeFactory(token: string): UserRoleFacade {
  const endpoint = new UserRoleEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new UserRoleFindAllUseCase(endpoint)
  const updateUseCase = new UserRoleUpdateUseCase(endpoint)

  return new UserRoleFacade(findAllUseCase, updateUseCase)
}
