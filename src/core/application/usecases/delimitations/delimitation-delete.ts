import type { DelimitationsEndpoint } from "@/infra/apis/ponto-cloud-client-side/delimitations"

export interface DelimitationsDeleteUseCaseDto {
  execute(delimitationId: string): Promise<void>
}

export class DelimitationsDeleteUseCase implements DelimitationsDeleteUseCaseDto {
  constructor(private readonly endpoint: DelimitationsEndpoint) { }
  async execute(delimitationId: string): Promise<void> {
    const { data } = await this.endpoint.delete(delimitationId)
    return data
  }
}
