import type { Company, CompanyDetails, CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Company[]>
type CreateCompany = CreateDto<CompanyFormProps>
type EditCompany = EditDto<CompanyFormProps>

interface CompaniesEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(companyId: string): Promise<AxiosResponse<CompanyDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateCompany): Promise<AxiosResponse<CreateCompanyResponse>>
  update(body: EditCompany): Promise<AxiosResponse<CreateCompanyResponse>>
  delete(id: string): Promise<AxiosResponse<void>>
}

export class CompaniesEndpoint implements CompaniesEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/company'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(companyId: string): Promise<AxiosResponse<CompanyDetails>> {
    return await this.client.get(`${this.endpoint}/${companyId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateCompany): Promise<AxiosResponse<CreateCompanyResponse>> {
    return await this.client.post<CreateCompany, CreateCompanyResponse>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditCompany): Promise<AxiosResponse<CreateCompanyResponse>> {
    return await this.client.put<EditCompany, CreateCompanyResponse>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(companyId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${companyId}`)
  }
}
