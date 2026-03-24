import type { DepartmentDetails, DepartmentFormProps } from "@/domain/entities/department";
import type { EditDto } from "@/domain/http/http-client";
import type { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";

export interface DepartmentsUpdateUseCaseDto {
  execute(body: EditDto<DepartmentFormProps>): Promise<DepartmentDetails | null>
}

export class DepartmentsUpdateUseCase implements DepartmentsUpdateUseCaseDto {
  constructor(private readonly endpoint: DepartmentsEndpoint) { }

  async execute(body: EditDto<Partial<DepartmentFormProps>>): Promise<DepartmentDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
