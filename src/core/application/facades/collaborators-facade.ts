import type { Collaborator, CollaboratorDetails, CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorWorkJourneyParams } from "@/domain/entities/collaborator/collaborator-work-journey";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { CollaboratorsFindByIdUseCaseDto } from "../usecases/collaborators/collaborator-find-by-id";
import type { CollaboratorsCreatedUseCaseDto } from "../usecases/collaborators/collaborators-create";
import type { CollaboratorsDeleteUseCaseDto } from "../usecases/collaborators/collaborators-delete";
import type { CollaboratorsFilteredUseCase } from "../usecases/collaborators/collaborators-filtered";
import type { CollaboratorsFindAllUseCase } from "../usecases/collaborators/collaborators-find-all";
import type { CollaboratorsUpdateUseCaseDto } from "../usecases/collaborators/collaborators-update";
import type { CollaboratorsUpdateWorkJourneyUseCaseDto } from "../usecases/collaborators/collaborators-update-work-journey";

type WorkJourneyResponse = Pick<CollaboratorDetails, 'hourBanks' | 'extraHours'>

type PaginationCollaborator = PaginationDto<Collaborator[]>

interface CollaboratorsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationCollaborator>
  findById(collaboratorId: string): Promise<CollaboratorDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationCollaborator>
  create(body: CreateDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null>
  update(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null>
  updateWorkJourney(body: CollaboratorWorkJourneyParams): Promise<WorkJourneyResponse | null>
  delete(requestId: string): Promise<void>
}

export class CollaboratorsFacade implements CollaboratorsFacadeDto {
  constructor(
    private readonly findAllUseCase: CollaboratorsFindAllUseCase,
    private readonly findByIdUseCase: CollaboratorsFindByIdUseCaseDto,
    private readonly filteredUseCase: CollaboratorsFilteredUseCase,
    private readonly createUseCase: CollaboratorsCreatedUseCaseDto,
    private readonly updateUseCase: CollaboratorsUpdateUseCaseDto,
    private readonly updateWorkJourneyUseCase: CollaboratorsUpdateWorkJourneyUseCaseDto,
    private readonly deleteUseCase: CollaboratorsDeleteUseCaseDto,
  ) { }
  async findAll(): Promise<PaginationCollaborator> {
    return await this.findAllUseCase.execute()
  }
  async findById(collaboratorId: string): Promise<CollaboratorDetails | null> {
    return await this.findByIdUseCase.execute(collaboratorId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationCollaborator> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<CollaboratorFormProps>): Promise<CollaboratorDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async updateWorkJourney(body: CollaboratorWorkJourneyParams): Promise<WorkJourneyResponse | null> {
    return await this.updateWorkJourneyUseCase.execute(body)
  }
  async delete(collaboratorId: string): Promise<void> {
    return await this.deleteUseCase.execute(collaboratorId)
  }
}
