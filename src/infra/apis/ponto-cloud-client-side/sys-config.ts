import type { SysConfigParameters } from "@/domain/entities/sys-config"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"

interface SysConfigEndPointDto {
  findParameters(): Promise<AxiosResponse<SysConfigParameters>>
}

export class SysConfigEndpoint implements SysConfigEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'register/parameters/'

  async findParameters(): Promise<AxiosResponse<SysConfigParameters>> {
    return await this.client.get<SysConfigParameters>(`${this.endpoint}findAllParameters`)
  }
}
