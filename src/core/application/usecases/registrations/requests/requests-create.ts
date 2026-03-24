import type { RequestDetails, RequestFormProps } from "@/domain/entities/request";
import type { CreateDto } from "@/domain/http/http-client";
import type { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests";


export interface RequestsCreatedUseCaseDto {
  execute(body: CreateDto<RequestFormProps>): Promise<RequestDetails | null>
}

export class RequestsCreatedUseCase implements RequestsCreatedUseCaseDto {
  constructor(private readonly endpoint: RequestsEndpoint) { }

  async execute(body: CreateDto<RequestFormProps>): Promise<RequestDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
