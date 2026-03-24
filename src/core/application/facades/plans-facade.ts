import type { Plan } from "@/domain/entities/plan"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { PlansFindAllPreBuiltUseCaseDto } from "../usecases/plan/plan-find-all-pre-built"


type PaginationPlan = PaginationDto<Plan[]>

interface PlanFacadeDto {
  findAllPreBuilt(): Promise<PaginationPlan>
}

export class PlansFacade implements PlanFacadeDto {
  constructor(
    private readonly findAllUseCase: PlansFindAllPreBuiltUseCaseDto,
  ) { }
  async findAllPreBuilt(): Promise<PaginationPlan> {
    return await this.findAllUseCase.execute()
  }

}
