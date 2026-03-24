import type { GeoFence } from "@/domain/entities/delimitation";
import type { CreateDto } from "@/domain/http/http-client";
import type { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations";

export interface DelimitationsCreatedUseCaseDto {
  execute(body: CreateDto<GeoFence>): Promise<GeoFence | null>
}

export class DelimitationsCreatedUseCase implements DelimitationsCreatedUseCaseDto {
  constructor(
    private readonly endpoint: DelimitationsEndpoint,
  ) { }

  async execute(body: CreateDto<GeoFence>): Promise<GeoFence | null> {
    const res = await this.endpoint.create({ ...body, radiusInMeters: Number(body.radiusInMeters) })
    return res?.data ?? null
  }
}
