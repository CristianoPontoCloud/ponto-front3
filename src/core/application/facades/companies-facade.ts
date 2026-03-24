import type { Company, CompanyDetails, CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies"
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { CompaniesCreatedUseCaseDto } from "../usecases/companies/companies-create"
import type { CompaniesDeleteUseCaseDto } from "../usecases/companies/companies-delete"
import type { CompaniesFilteredUseCaseDto } from "../usecases/companies/companies-filtered"
import type { CompaniesFindAllUseCaseDto } from "../usecases/companies/companies-find-all"
import type { CompaniesFindByIdUseCaseDto } from "../usecases/companies/companies-find-by-id"
import type { CompaniesUpdateUseCaseDto } from "../usecases/companies/companies-update"


type PaginationCompanie = PaginationDto<Company[]>

interface CompaniesFacadeDto {
  findAll(params?: FilteredParamsDto): Promise<PaginationCompanie>
  findById(companyId: string): Promise<CompanyDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationCompanie>
  create(body: CreateDto<CompanyFormProps>): Promise<CreateCompanyResponse | null>
  update(body: EditDto<CompanyFormProps>): Promise<CreateCompanyResponse | null>
  delete(companyId: string): Promise<void>
}

export class CompaniesFacade implements CompaniesFacadeDto {
  constructor(
    private readonly findAllUseCase: CompaniesFindAllUseCaseDto,
    private readonly findByIdUseCase: CompaniesFindByIdUseCaseDto,
    private readonly filteredUseCase: CompaniesFilteredUseCaseDto,
    private readonly createUseCase: CompaniesCreatedUseCaseDto,
    private readonly updateUseCase: CompaniesUpdateUseCaseDto,
    private readonly deleteUseCase: CompaniesDeleteUseCaseDto,
  ) { }
  async findAll(params?: FilteredParamsDto): Promise<PaginationCompanie> {
    return await this.findAllUseCase.execute(params)
  }
  async findById(companyId: string): Promise<CompanyDetails | null> {
    return await this.findByIdUseCase.execute(companyId)
  }
  async filtered(params?: FilteredParamsDto): Promise<PaginationCompanie> {
    return await this.filteredUseCase.execute(params)
  }
  async create(body: CreateDto<CompanyFormProps>): Promise<CreateCompanyResponse | null> {
    return await this.createUseCase.execute(body)
  }
  async update(body: EditDto<CompanyFormProps>): Promise<CreateCompanyResponse | null> {
    return await this.updateUseCase.execute(body)
  }
  async delete(companyId: string): Promise<void> {
    return await this.deleteUseCase.execute(companyId)
  }
}
