import type { UserRole, UserRoleIds } from "@/domain/entities/user-role"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

type FindAllResponse = UserRole[]

interface UserRoleEndPointDto {
  findAll(): Promise<AxiosResponse<FindAllResponse>>
  update(body: UserRoleIds): Promise<AxiosResponse<UserRole>>
}

export class UserRoleEndpoint implements UserRoleEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/user-role'

  async findAll(): Promise<AxiosResponse<FindAllResponse>> {
    return await this.client.get<FindAllResponse>(this.endpoint)
  }

  async update(body: UserRoleIds): Promise<AxiosResponse<UserRole>> {
    return await this.client.put<UserRoleIds, UserRole>({ body, url: `${this.endpoint}/${body.userId}` })
  }

}
