import type { Marking, MarkingFormProps } from "@/domain/entities/marking"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { MarkingCreatedUseCaseDto } from "../usecases/marking/marking-create-use-case"
import type { MarkingDeleteUseCaseDto } from "../usecases/marking/marking-delete-use-case"
import type { MarkingUpdateUseCaseDto } from "../usecases/marking/marking-update-use-case"


// type PaginationMarking = PaginationDto<Marking[]>

interface MarkingFacadeDto {
  // findAll(params?: FilteredParamsDto): Promise<PaginationMarking>
  // findById(companyId: string): Promise<MarkingDetails | null>
  // filtered(params?: FilteredParamsDto): Promise<PaginationMarking>
  create(body: CreateDto<MarkingFormProps>): Promise<Marking | null>
  update(body: EditDto<MarkingFormProps>): Promise<Marking | null>
  delete(markingId: string): Promise<void>
}

export class MarkingsFacade implements MarkingFacadeDto {
  constructor(
    // private readonly findAllUseCase: MarkingsFindAllUseCaseDto,
    // private readonly findByIdUseCase: MarkingsFindByIdUseCaseDto,
    // private readonly filteredUseCase: MarkingsFilteredUseCaseDto,
    private readonly createUseCase: MarkingCreatedUseCaseDto,
    private readonly updateUseCase: MarkingUpdateUseCaseDto,
    private readonly deleteUseCase: MarkingDeleteUseCaseDto,
  ) { }
  // async findAll(params?: FilteredParamsDto): Promise<PaginationMarking> {
  //   return await this.findAllUseCase.execute(params)
  // }
  // async findById(companyId: string): Promise<MarkingDetails | null> {
  //   return await this.findByIdUseCase.execute(companyId)
  // }
  // async filtered(params?: FilteredParamsDto): Promise<PaginationMarking> {
  //   return await this.filteredUseCase.execute(params)
  // }
  async create(body: CreateDto<MarkingFormProps>): Promise<Marking | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<MarkingFormProps>): Promise<Marking | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(companyId: string): Promise<void> {
    return await this.deleteUseCase.execute(companyId)
  }
}
