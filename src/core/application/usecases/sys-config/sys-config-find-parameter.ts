import type { SysConfigParameters } from "@/domain/entities/sys-config"
import type { SysConfigEndpoint } from "@/infra/apis/ponto-cloud-client-side/sys-config"

export interface SysConfigFindParametersUseCaseDto {
  execute(): Promise<SysConfigParameters | null>
}

export class SysConfigFindParametersUseCase implements SysConfigFindParametersUseCaseDto {
  constructor(private readonly endpoint: SysConfigEndpoint) { }

  async execute(): Promise<SysConfigParameters | null> {
    const res = await this.endpoint.findParameters()
    return res?.data ?? null
    // if (!res?.data) return null
    // const data = res.data
    // const {
    //   maximumDSRAbsences,
    //   absenceToleranceInMinutes,
    //   punchingToleranceInMinutes,
    //   dailyMinimumAbsentInMinutes,
    //   dailyMinimumExtraHoursInMinutes,
    // } = data
    // return {
    //   ...data,
    //   maximumDSRAbsences: maximumDSRAbsences.toString(),
    //   absenceToleranceInMinutes: absenceToleranceInMinutes.toString(),
    //   punchingToleranceInMinutes: punchingToleranceInMinutes.toString(),
    //   dailyMinimumAbsentInMinutes: dailyMinimumAbsentInMinutes.toString(),
    //   dailyMinimumExtraHoursInMinutes: dailyMinimumExtraHoursInMinutes.toString(),
    // }
  }
}
