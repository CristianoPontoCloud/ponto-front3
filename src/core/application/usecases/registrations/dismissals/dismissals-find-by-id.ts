import type { DismissalDetails } from "@/domain/entities/dismissal"
import type { DismissalsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/dismissals"

export interface DismissalsFindByIdUseCaseDto {
  execute(holidayId: string): Promise<DismissalDetails | null>
}

export class DismissalsFindByIdUseCase implements DismissalsFindByIdUseCaseDto {
  constructor(private readonly endpoint: DismissalsEndpoint) { }

  async execute(holidayId: string): Promise<DismissalDetails | null> {
    const res = await this.endpoint.findById(holidayId)
    return res?.data ?? null
  }
}
