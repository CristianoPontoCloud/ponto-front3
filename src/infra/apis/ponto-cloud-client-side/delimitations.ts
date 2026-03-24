import type { GeoFence } from "@/domain/entities/delimitation"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<GeoFence[]>

interface DelimitationsEndPointDto {
  create(body: CreateDto<GeoFence>): Promise<AxiosResponse<GeoFence>>
  update(body: EditDto<Partial<GeoFence>>): Promise<AxiosResponse<GeoFence>>
  findById(geofenceId: string): Promise<AxiosResponse<GeoFence>>
  findAllByCompanyId(): Promise<AxiosResponse<FindAllResponse>>
  delete(geofenceId: string): Promise<AxiosResponse<void>>
}

export class DelimitationsEndpoint implements DelimitationsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/geo-fence'

  async create(body: CreateDto<GeoFence>): Promise<AxiosResponse<GeoFence>> {
    return await this.client.post<CreateDto<GeoFence>, GeoFence>({ url: this.endpoint, body })
  }
  async update(body: EditDto<Partial<GeoFence>>): Promise<AxiosResponse<GeoFence>> {
    return await this.client.put<Partial<GeoFence>, GeoFence>({
      url: `${this.endpoint}/${body.id}`, body
    })
  }
  async findAllByCompanyId(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllByCompanyId`)
  }
  async findById(geofenceId: string): Promise<AxiosResponse<GeoFence>> {
    return await this.client.get<GeoFence>(`${this.endpoint}/${geofenceId}`)
  }
  async delete(geofenceId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${geofenceId}`)
  }
}
