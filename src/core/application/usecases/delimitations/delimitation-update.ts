import type { GeoFence } from "@/domain/entities/delimitation";
import type { EditDto } from "@/domain/http/http-client";
import type { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations";

export interface DelimitationsUpdateUseCaseDto {
  execute(body: EditDto<Partial<GeoFence>>): Promise<GeoFence | null>
}

export class DelimitationsUpdateUseCase implements DelimitationsUpdateUseCaseDto {
  constructor(private readonly endpoint: DelimitationsEndpoint) { }

  async execute(body: EditDto<Partial<GeoFence>>): Promise<GeoFence | null> {
    const bodyCase = body?.radiusInMeters ? {
      ...body,
      radiusInMeters: Number(body.radiusInMeters)
    } : body
    const res = await this.endpoint.update(bodyCase)
    return res?.data ?? null
  }
}
