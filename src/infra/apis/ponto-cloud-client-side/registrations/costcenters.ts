import type { CostCenter, CostCenterDetails, CostCenterFormProps } from "@/domain/entities/center-cost"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<CostCenter[]>
type CreateCostCenter = CreateDto<CostCenterFormProps>
type EditCostCenter = EditDto<CostCenterFormProps>

interface CostCentersEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(costCenterId: string): Promise<AxiosResponse<CostCenterDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateCostCenter): Promise<AxiosResponse<CostCenterDetails>>
  update(body: EditCostCenter): Promise<AxiosResponse<CostCenterDetails>>
  delete(costCenterId: string): Promise<AxiosResponse<void>>
}

export class CostCentersEndpoint implements CostCentersEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/center-cost'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(costCenterId: string): Promise<AxiosResponse<CostCenterDetails>> {
    return await this.client.get<CostCenterDetails>(`${this.endpoint}/${costCenterId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateCostCenter): Promise<AxiosResponse<CostCenterDetails>> {
    return await this.client.post<CreateCostCenter, CostCenterDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditCostCenter): Promise<AxiosResponse<CostCenterDetails>> {
    return await this.client.put<EditCostCenter, CostCenterDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(costCenterId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${costCenterId}`)
  }
}
