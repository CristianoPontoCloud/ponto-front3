import type { Department, DepartmentDetails, DepartmentFindAllCompanyManagersResponse, DepartmentFormProps } from "@/domain/entities/department"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Department[]>
type CreateDepartment = CreateDto<DepartmentFormProps>
type EditDepartment = EditDto<Partial<DepartmentFormProps>>
type PaginationManagers = PaginationDto<DepartmentFindAllCompanyManagersResponse[]>

interface DepartmentsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findAllCompanyManagers(urlParams?: string): Promise<AxiosResponse<PaginationManagers>>
  findById(departmentId: string): Promise<AxiosResponse<DepartmentDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateDepartment): Promise<AxiosResponse<DepartmentDetails>>
  update(body: EditDepartment): Promise<AxiosResponse<DepartmentDetails>>
  delete(departmentId: string): Promise<AxiosResponse<void>>
}

export class DepartmentsEndpoint implements DepartmentsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/department'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findAllCompanyManagers(urlParams?: string): Promise<AxiosResponse<PaginationManagers>> {
    return await this.client.get<PaginationManagers>(`${this.endpoint}/findAllCompanyManagers${urlParams ?? ''}`)
  }
  async findById(departmentId: string): Promise<AxiosResponse<DepartmentDetails>> {
    return await this.client.get<DepartmentDetails>(`${this.endpoint}/${departmentId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateDepartment): Promise<AxiosResponse<DepartmentDetails>> {
    return await this.client.post<CreateDepartment, DepartmentDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditDepartment): Promise<AxiosResponse<DepartmentDetails>> {
    return await this.client.put<EditDepartment, DepartmentDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(departmentId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${departmentId}`)
  }
}
