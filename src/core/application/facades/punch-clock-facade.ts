import type { PunchFormProps, PunchResponse } from "@/domain/entities/punch"
import type { PunchCreateUseCase } from "../usecases/punch-clock/punch-create-use-case"


interface PunchClockFacadeDto {
  punch(body: PunchFormProps): Promise<PunchResponse | null>
}

export class PunchClockFacade implements PunchClockFacadeDto {
  constructor(
    private readonly punchCreateUsecase: PunchCreateUseCase,
  ) { }
  async punch(body: PunchFormProps): Promise<PunchResponse | null> {
    return await this.punchCreateUsecase.execute(body)
  }
}
