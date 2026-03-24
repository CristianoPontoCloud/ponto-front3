import type { UserRole } from "@/domain/entities/user-role";
import type { UserRoleEndpoint } from "@/infra/apis/ponto-cloud-client-side/user-role";


export interface UserRoleFindAllUseCaseDto {
  execute(): Promise<UserRole[]>
}

export class UserRoleFindAllUseCase implements UserRoleFindAllUseCaseDto {
  constructor(private readonly endpoint: UserRoleEndpoint) { }
  async execute(): Promise<UserRole[]> {

    const { data } = await this.endpoint.findAll()

    return data
  }
}
