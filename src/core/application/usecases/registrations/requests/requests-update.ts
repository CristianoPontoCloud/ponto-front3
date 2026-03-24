import type { RequestDetails, RequestFormProps } from "@/domain/entities/request";
import type { EditDto } from "@/domain/http/http-client";
import type { RequestsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/requests";

export interface RequestsUpdateUseCaseDto {
  execute(body: EditDto<RequestFormProps>): Promise<RequestDetails | null>
}

export class RequestsUpdateUseCase implements RequestsUpdateUseCaseDto {
  constructor(private readonly endpoint: RequestsEndpoint) { }

  async execute(body: EditDto<RequestFormProps>): Promise<RequestDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
