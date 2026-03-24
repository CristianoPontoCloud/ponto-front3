import type { Equipment, EquipmentDetails, EquipmentFormProps } from "@/domain/entities/equipment"
import type { CreateDto, EditDto } from "@/domain/http/http-client"
import type { PaginationDto } from "@/domain/http/pagination-dto"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = PaginationDto<Equipment[]>
type CreateEquipment = CreateDto<EquipmentFormProps>
type EditEquipment = EditDto<EquipmentFormProps>

interface EquipmentsEndPointDto {
  findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  findById(equipmentId: string): Promise<AxiosResponse<EquipmentDetails>>
  filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>>
  create(body: CreateEquipment): Promise<AxiosResponse<EquipmentDetails>>
  update(body: EditEquipment): Promise<AxiosResponse<EquipmentDetails>>
  delete(equipmentId: string): Promise<AxiosResponse<void>>
}

export class EquipmentsEndpoint implements EquipmentsEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/equipment'

  async findAll(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}${urlParams ?? ''}`)
  }
  async findById(equipmentId: string): Promise<AxiosResponse<EquipmentDetails>> {
    return await this.client.get<EquipmentDetails>(`${this.endpoint}/${equipmentId}`)
  }
  async filtered(urlParams?: string): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(`${this.endpoint}/findAllFiltered${urlParams ?? ""}`)
  }
  async create(body: CreateEquipment): Promise<AxiosResponse<EquipmentDetails>> {
    return await this.client.post<CreateEquipment, EquipmentDetails>({ body, url: `${this.endpoint}` })
  }
  async update(body: EditEquipment): Promise<AxiosResponse<EquipmentDetails>> {
    return await this.client.put<EditEquipment, EquipmentDetails>({ body, url: `${this.endpoint}/${body.id}` })
  }
  async delete(equipmentId: string): Promise<AxiosResponse<void>> {
    return await this.client.delete<void>(`${this.endpoint}/${equipmentId}`)
  }

}
