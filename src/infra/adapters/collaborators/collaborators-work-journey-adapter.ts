import type { CostCenterDetails } from "@/domain/entities/center-cost";
import type { CollaboratorDetails, CollaboratorWorkdayExtraHour, CollaboratorWorkdayHourBank } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import type { CollaboratorWorkShift } from "@/domain/entities/collaborator/collaborator-work-shift";
import type { CompanyDetails } from "@/domain/entities/companies";
import type { DepartmentDetails } from "@/domain/entities/department";
import type { ExtraHourDetails } from "@/domain/entities/extra-hour/extra-hour";
import type { HolidayDetails } from "@/domain/entities/holiday";
import type { HourBankDetails } from "@/domain/entities/hour-bank";
import type { PositionDetails } from "@/domain/entities/positions";
import type { TimeRegistersDto } from "@/domain/entities/time-registers";
import type { TurnDetails } from "@/domain/entities/turns/turns";

type WorkJourneyResponse = Pick<CollaboratorDetails, 'hourBanks' | 'extraHours'>

export interface CollaboratorApiResponse extends TimeRegistersDto {
  id: string,
  nsr: number,
  name: string,
  surname: string,
  email: string,
  cpf: string,
  hasCpf: boolean,
  dtAdmission: string,
  secondaryEmail: string,
  hasNoPis: boolean,
  pis: string,
  positionTrust: boolean,
  registration: string,
  sheet: string,
  ctps: string,
  clt: string,
  phone: string,
  phoneExtension: string,
  status: CollaboratorStatusEnum,
  company: CompanyDetails
  department: DepartmentDetails,
  positions: PositionDetails[]
  holidays: HolidayDetails[],
  centerCost: CostCenterDetails[],
  workShifts: TurnDetails[],
  extraTimes: ExtraHourDetails[],
  hourBanks: HourBankDetails[],
  onNotices: [],
  erppConfig: null,
  userId: string,
  companyId: string,
  departmentId: string,
  positionId: string,
  centerCostId: string
}

export interface CollaboratorDetailsApiResponse extends TimeRegistersDto {
  id: string,
  nsr: number,
  name: string,
  surname: string,
  email: string,
  cpf: string
  hasCpf: boolean,
  dtAdmission: string,
  secondaryEmail: string,
  hasNoPis: boolean,
  pis: string,
  positionTrust: boolean,
  registration: string,
  sheet: string,
  ctps: string,
  clt: string,
  phone: string,
  phoneExtension: string,
  status: CollaboratorStatusEnum,
  company: CompanyDetails
  department: DepartmentDetails,
  positions: PositionDetails[]
  holidays: HolidayDetails[],
  centerCost: CostCenterDetails[],
  workShifts: CollaboratorWorkShift[],
  extraTimes: ExtraHourDetails[],
  hourBanks: HourBankDetails[],
  onNotices: [],
  erppConfig: null,
  userId: string,
  companyId: string,
  departmentId: string,
  positionId: string,
  centerCostId: string
}

export class CollaboratorWorkJourneyAdapter {
  execute(collaborator: CollaboratorApiResponse): WorkJourneyResponse {
    return {
      hourBanks: this.adaptHourBanks(collaborator.hourBanks),
      // turns: this.adaptWorkShifts(collaborator.workShifts),
      extraHours: this.adaptExtraTime(collaborator.extraTimes)
    }

  }
  private adaptHourBanks(hourBanks: HourBankDetails[]): CollaboratorWorkdayHourBank[] {
    const parsedHourBanks: CollaboratorWorkdayHourBank[] = []
    for (const hourBank of hourBanks) {
      parsedHourBanks.push({
        observation: "",
        startDate: null,
        endDate: null,
        hourBankId: hourBank.id,
        hourBankName: hourBank.name
      })
    }
    return parsedHourBanks
  }
  private adaptExtraTime(extraTimes: ExtraHourDetails[]): CollaboratorWorkdayExtraHour[] {
    const parsedExtraTime: CollaboratorWorkdayExtraHour[] = []
    for (const extratime of extraTimes) {
      parsedExtraTime.push({
        observation: "",
        startDate: null,
        endDate: null,
        extraHourId: extratime.id,
        extraHourName: extratime.name
      })
    }
    return parsedExtraTime
  }
}
