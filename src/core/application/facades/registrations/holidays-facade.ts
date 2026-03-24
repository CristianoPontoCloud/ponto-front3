import type { HolidaysCreatedUseCaseDto } from "@/application/usecases/registrations/holidays/holidays-create";
import type { HolidaysDeleteUseCaseDto } from "@/application/usecases/registrations/holidays/holidays-delete";
import type { HolidaysFilteredUseCase } from "@/application/usecases/registrations/holidays/holidays-filtered";
import type { HolidaysFindAllUseCase } from "@/application/usecases/registrations/holidays/holidays-find-all";
import type { HolidaysFindByIdUseCaseDto } from "@/application/usecases/registrations/holidays/holidays-find-by-id";
import type { HolidaysUpdateUseCaseDto } from "@/application/usecases/registrations/holidays/holidays-update";
import type { Holiday, HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";

type PaginationHoliday = PaginationDto<Holiday[]>

interface HolidaysFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationHoliday>
  findById(holidayId: string): Promise<HolidayDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationHoliday>
  create(body: CreateDto<HolidayFormProps>): Promise<HolidayDetails | null>
  update(body: EditDto<HolidayFormProps>): Promise<HolidayDetails | null>
  delete(holidayId: string): Promise<void>
}

export class HolidaysFacade implements HolidaysFacadeDto {
  constructor(
    private readonly findAllUseCase: HolidaysFindAllUseCase,
    private readonly findByIdUseCase: HolidaysFindByIdUseCaseDto,
    private readonly filteredUseCase: HolidaysFilteredUseCase,
    private readonly createUseCase: HolidaysCreatedUseCaseDto,
    private readonly updateUseCase: HolidaysUpdateUseCaseDto,
    private readonly deleteUseCase: HolidaysDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationHoliday> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(holidayId: string): Promise<HolidayDetails | null> {
    return await this.findByIdUseCase.execute(holidayId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationHoliday> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<HolidayFormProps>): Promise<HolidayDetails | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<HolidayFormProps>): Promise<HolidayDetails | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(holidayId: string): Promise<void> {
    return await this.deleteUseCase.execute(holidayId)
  }
}
