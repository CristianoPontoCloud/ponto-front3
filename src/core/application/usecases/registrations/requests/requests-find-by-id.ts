import type { RequestDetails } from "@/domain/entities/request"
import type { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests"

export interface RequestsFindByIdUseCaseDto {
  execute(holidayId: string): Promise<RequestDetails | null>
}

export class RequestsFindByIdUseCase implements RequestsFindByIdUseCaseDto {
  constructor(private readonly endpoint: RequestsEndpoint) { }

  async execute(holidayId: string): Promise<RequestDetails | null> {
    const res = await this.endpoint.findById(holidayId)
    return res?.data ?? null
  }
}
