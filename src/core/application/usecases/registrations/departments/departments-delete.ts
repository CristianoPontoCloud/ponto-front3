import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments"


export interface DepartmentsDeleteUseCaseDto {
  execute(equipmentId: string): Promise<void>
}

export class DepartmentsDeleteUseCase implements DepartmentsDeleteUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }
  async execute(equipmentId: string): Promise<void> {
    const { data } = await this.endpoint.delete(equipmentId)
    return data
  }
}
