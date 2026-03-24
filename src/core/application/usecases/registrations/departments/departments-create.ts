import type { DepartmentDetails, DepartmentFormProps } from "@/domain/entities/department";
import type { CreateDto } from "@/domain/http/http-client";
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";


export interface DepartmentsCreatedUseCaseDto {
  execute(body: CreateDto<DepartmentFormProps>): Promise<DepartmentDetails | null>
}

export class DepartmentsCreatedUseCase implements DepartmentsCreatedUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }

  async execute(body: CreateDto<DepartmentFormProps>): Promise<DepartmentDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
