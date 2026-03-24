import type { Position, PositionDetails, PositionFormProps } from "@/domain/entities/positions"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Position[]>
type CreatePosition = CreateDto<PositionFormProps>
type EditPosition = EditDto<PositionFormProps>
interface PositionsEndPointDto {
  findAll(): Promise<AxiosResponse<FindAllResponse>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(positionId: string): Promise<AxiosResponse<PositionDetails>>
  create(body: CreatePosition): Promise<AxiosResponse<PositionDetails>>
  update(body: EditPosition): Promise<AxiosResponse<PositionDetails>>
  delete(positionId: string): Promise<AxiosResponse<void>>
}

export class PositionsEndpoint implements PositionsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/position'

  async findAll(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async findAllPreBuilt(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllPreBuilt`)
  }
  async findById(positionId: string): Promise<AxiosResponse<PositionDetails>> {
    return await this.client.get<PositionDetails>(`${this.endpoint}/${positionId}`)
  }
  async create(body: CreatePosition): Promise<AxiosResponse<PositionDetails>> {
    return await this.client.post<CreatePosition, PositionDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditPosition): Promise<AxiosResponse<PositionDetails>> {
    return await this.client.put<EditPosition, PositionDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(positionId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${positionId}`)
  }
}
