import type { EquipmentsCreatedUseCaseDto } from "@/application/usecases/registrations/equipments/equipments-create";
import type { EquipmentsDeleteUseCaseDto } from "@/application/usecases/registrations/equipments/equipments-delete";
import type { EquipmentsFilteredUseCase } from "@/application/usecases/registrations/equipments/equipments-filtered";
import type { EquipmentsUpdateUseCaseDto } from "@/application/usecases/registrations/equipments/equipments-update";
import type { Equipment, EquipmentDetails, EquipmentFormProps } from "@/domain/entities/equipment";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { EquipmentsFindAllUseCase } from "../../usecases/registrations/equipments/equipments-find-all";
import type { EquipmentsFindByIdUseCaseDto } from "../../usecases/registrations/equipments/equipments-find-by-id";

type PaginationEquipment = PaginationDto<Equipment[]>


interface EquipmentsFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationEquipment>
  findById(equipmentId: string): Promise<EquipmentDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationEquipment>
  create(body: CreateDto<EquipmentFormProps>): Promise<EquipmentDetails | null>
  update(body: EditDto<EquipmentFormProps>): Promise<EquipmentDetails | null>
  delete(equipmentId: string): Promise<void>
}

export class EquipmentsFacade implements EquipmentsFacadeDto {
  constructor(
    private readonly findAllUseCase: EquipmentsFindAllUseCase,
    private readonly findByIdUseCase: EquipmentsFindByIdUseCaseDto,
    private readonly filteredUseCase: EquipmentsFilteredUseCase,
    private readonly createUseCase: EquipmentsCreatedUseCaseDto,
    private readonly updateUseCase: EquipmentsUpdateUseCaseDto,
    private readonly deleteUseCase: EquipmentsDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationEquipment> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(equipmentId: string): Promise<EquipmentDetails | null> {
    return await this.findByIdUseCase.execute(equipmentId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationEquipment> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<EquipmentFormProps>): Promise<EquipmentDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<EquipmentFormProps>): Promise<EquipmentDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(equipmentId: string): Promise<void> {
    return await this.deleteUseCase.execute(equipmentId)
  }
}
