import type { RolePermission } from "@/domain/entities/role-permission"
import type { RolePermissionFindAllUseCaseDto } from "../usecases/role-permission/role-permission-find-all"


interface RolePermissionFacadeDto {
  findAll(): Promise<RolePermission[]>
  // update(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null>
}

export class RolePermissionFacade implements RolePermissionFacadeDto {
  constructor(
    private readonly findAllUseCase: RolePermissionFindAllUseCaseDto,
    // private readonly updateUseCase: RolePermissionUpdateUseCaseDto,
  ) { }
  async findAll(): Promise<RolePermission[]> {
    return await this.findAllUseCase.execute()
  }

  // async update(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null> {
  //   return await this.updateUseCase.execute(body)
  // }
}
