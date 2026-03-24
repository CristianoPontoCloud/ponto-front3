import type { Plan } from "@/domain/entities/plan";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { PlanEndpoint } from "@/infra/apis/ponto-cloud-client-side/plan";

type FindAllResponse = PaginationDto<Plan[]>

export interface PlansFindAllPreBuiltUseCaseDto {
  execute(): Promise<FindAllResponse>
}

export class PlansFindAllPreBuiltUseCase implements PlansFindAllPreBuiltUseCaseDto {
  constructor(private readonly endpoint: PlanEndpoint) { }
  async execute(): Promise<FindAllResponse> {
    const { data } = await this.endpoint.findAll()
    return data
  }
}
