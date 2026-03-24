import type { DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal";
import type { EditDto } from "@/domain/http/http-client";
import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals";

export interface DismissalsUpdateUseCaseDto {
  execute(body: EditDto<DismissalFormProps>): Promise<DismissalDetails | null>
}

export class DismissalsUpdateUseCase implements DismissalsUpdateUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }

  async execute(body: EditDto<DismissalFormProps>): Promise<DismissalDetails | null> {
    const res = await this.endpoint.update(body)
    return res?.data ?? null
  }
}
