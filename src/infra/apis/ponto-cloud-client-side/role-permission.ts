import type { RolePermission } from "@/domain/entities/role-permission"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = RolePermission[]

interface RolePermissionEndPointDto {
  findAll(): Promise<AxiosResponse<FindAllResponse>>
  // update(body: EditCollaborator): Promise<AxiosResponse<any>>
}

export class RolePermissionEndpoint implements RolePermissionEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/role-permission'

  async findAll(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(this.endpoint)
  }

  // async update(body: EditCollaborator): Promise<AxiosResponse<any>> {
  //   return await this.client.put<EditCollaborator, any>({ body, url: `${this.endpoint}/${body.id}` })
  // }

}
