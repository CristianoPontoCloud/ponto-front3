import type { DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal";
import type { CreateDto } from "@/domain/http/http-client";
import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals";


export interface DismissalsCreatedUseCaseDto {
  execute(body: CreateDto<DismissalFormProps>): Promise<DismissalDetails | null>
}

export class DismissalsCreatedUseCase implements DismissalsCreatedUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }

  async execute(body: CreateDto<DismissalFormProps>): Promise<DismissalDetails | null> {
    const res = await this.endpoint.create(body)
    return res?.data ?? null
  }
}
