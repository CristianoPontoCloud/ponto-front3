import type { DepartmentsFindByIdUseCaseDto } from "@/application/usecases/registrations/departments/department-find-by-id"
import type { DepartmentsCreatedUseCaseDto } from "@/application/usecases/registrations/departments/departments-create"
import type { DepartmentsDeleteUseCaseDto } from "@/application/usecases/registrations/departments/departments-delete"
import type { DepartmentsFilteredUseCase } from "@/application/usecases/registrations/departments/departments-filtered"
import type { DepartmentsFindAllUseCaseDto } from "@/application/usecases/registrations/departments/departments-find-all"
import type { DepartmentsFindAllCompanyManagersUseCaseDto } from "@/application/usecases/registrations/departments/departments-find-all-company-managers"
import type { DepartmentsUpdateUseCaseDto } from "@/application/usecases/registrations/departments/departments-update"
import type { Department, DepartmentDetails, DepartmentFindAllCompanyManagersResponse, DepartmentFormProps } from "@/domain/entities/department"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"

type PaginationDepartment = PaginationDto<Department[]>
type PaginationManagers = PaginationDto<DepartmentFindAllCompanyManagersResponse[]>


interface DepartmentsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationDepartment>
  findAllCompanyManagers(params?: FilteredParamsDto): Promise<PaginationManagers>
  findById(equipmentId: string): Promise<DepartmentDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationDepartment>
  create(body: CreateDto<DepartmentFormProps>): Promise<DepartmentDetails | null>
  update(body: EditDto<DepartmentFormProps>): Promise<DepartmentDetails | null>
  delete(equipmentId: string): Promise<void>
}

export class DepartmentsFacade implements DepartmentsFacadeDto {
  constructor(
    private readonly findAllUseCase: DepartmentsFindAllUseCaseDto,
    private readonly findAllCompanyManagersUseCase: DepartmentsFindAllCompanyManagersUseCaseDto,
    private readonly findByIdUseCase: DepartmentsFindByIdUseCaseDto,
    private readonly filteredUseCase: DepartmentsFilteredUseCase,
    private readonly createUseCase: DepartmentsCreatedUseCaseDto,
    private readonly updateUseCase: DepartmentsUpdateUseCaseDto,
    private readonly deleteUseCase: DepartmentsDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationDepartment> {
    return await this.findAllUseCase.execute(params)
  }
  async findAllCompanyManagers(params?: FilteredParamsDto): Promise<PaginationManagers> {
    return await this.findAllCompanyManagersUseCase.execute(params)
  }
  async findById(equipmentId: string): Promise<DepartmentDetails | null> {
    return await this.findByIdUseCase.execute(equipmentId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationDepartment> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<DepartmentFormProps>): Promise<DepartmentDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<DepartmentFormProps>): Promise<DepartmentDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(equipmentId: string): Promise<void> {
    return await this.deleteUseCase.execute(equipmentId)
  }
}
