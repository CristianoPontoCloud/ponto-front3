import type { DepartmentDetails } from "@/domain/entities/department"
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments"

export interface DepartmentsFindByIdUseCaseDto {
  execute(occurrenceId: string): Promise<DepartmentDetails | null>
}

export class DepartmentsFindByIdUseCase implements DepartmentsFindByIdUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }

  async execute(occurrenceId: string): Promise<DepartmentDetails | null> {
    const res = await this.endpoint.findById(occurrenceId)
    return res?.data ?? null
  }
}
