import type { RolePermission } from "@/domain/entities/role-permission"
import type { RolePermissionEndpoint } from "@/infra/apis/ponto-cloud-client-side/role-permission"


export interface RolePermissionFindAllUseCaseDto {
  execute(): Promise<RolePermission[]>
}

export class RolePermissionFindAllUseCase implements RolePermissionFindAllUseCaseDto {
  constructor(private readonly endpoint: RolePermissionEndpoint) { }
  async execute(): Promise<RolePermission[]> {

    const { data } = await this.endpoint.findAll()

    return data
  }
}
