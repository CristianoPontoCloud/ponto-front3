import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { RolePermissionEndpoint } from "@/infra/apis/ponto-cloud-client-side/role-permission";
import { RolePermissionFacade } from "../facades/role-permission";
import { RolePermissionFindAllUseCase } from "../usecases/role-permission/role-permission-find-all";

export function RolePermissionFacadeFactory(token: string): RolePermissionFacade {
  const endpoint = new RolePermissionEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new RolePermissionFindAllUseCase(endpoint)

  return new RolePermissionFacade(findAllUseCase)
}
