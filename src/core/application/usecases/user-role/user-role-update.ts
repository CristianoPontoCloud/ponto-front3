import type { UserRole, UserRoleIds } from "@/domain/entities/user-role";
import type { UserRoleEndpoint } from "@/infra/apis/ponto-cloud-client-side/user-role";


export interface UserRoleUpdateUseCaseDto {
  execute(body: UserRoleIds): Promise<UserRole>
}

export class UserRoleUpdateUseCase implements UserRoleUpdateUseCaseDto {
  constructor(private readonly endpoint: UserRoleEndpoint) { }
  async execute(body: UserRoleIds): Promise<UserRole> {

    const { data } = await this.endpoint.update(body)

    return data
  }
}
