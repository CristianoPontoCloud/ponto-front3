import type { UserRole, UserRoleIds } from "@/domain/entities/user-role";
import type { UserRoleFindAllUseCaseDto } from "../usecases/user-role/user-role-find-all";
import type { UserRoleUpdateUseCaseDto } from "../usecases/user-role/user-role-update";


interface UserRoleFacadeDto {
  findAll(): Promise<UserRole[]>
  update(body: UserRoleIds): Promise<UserRole | null>
}

export class UserRoleFacade implements UserRoleFacadeDto {
  constructor(
    private readonly findAllUseCase: UserRoleFindAllUseCaseDto,
    private readonly updateUseCase: UserRoleUpdateUseCaseDto,
  ) { }
  async findAll(): Promise<UserRole[]> {
    return await this.findAllUseCase.execute()
  }
  async update(body: UserRoleIds): Promise<UserRole | null> {
    return await this.updateUseCase.execute(body)
  }
}
