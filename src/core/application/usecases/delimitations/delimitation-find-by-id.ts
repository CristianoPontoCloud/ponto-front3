import type { GeoFence } from "@/domain/entities/delimitation"
import type { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations"

export interface DelimitationsFindByIdUseCaseDto {
  execute(delimitationId: string): Promise<GeoFence | null>
}

export class DelimitationsFindByIdUseCase implements DelimitationsFindByIdUseCaseDto {
  constructor(private readonly endpoint: DelimitationsEndpoint) { }

  async execute(delimitationId: string): Promise<GeoFence | null> {
    const res = await this.endpoint.findById(delimitationId)
    if (!res?.data) return null
    return {
      ...res.data,
      radiusInMeters: res.data.radiusInMeters.toString()
    }
  }
}
