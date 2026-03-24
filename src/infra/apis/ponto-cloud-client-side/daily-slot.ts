import type { DailySlotIgnoreParams, DailySlotMoveToDateParams, DailySlotReconsiderParams, DailySlotShiftParams, DailySlotUpdateParams } from "@/domain/entities/daily-slot/daily-slot"
import type { DailySlotCreateBody } from "@/domain/entities/daily-slot/daily-slot-create"
import type { HttpClient } from "@/infra/http/http-client"
import type { AxiosResponse } from "axios"


interface DailySlotEndPointDto {
  update(params: DailySlotUpdateParams): Promise<AxiosResponse<unknown>>
  ignore(params: DailySlotIgnoreParams): Promise<AxiosResponse<unknown>>
  reconsider(params: DailySlotReconsiderParams): Promise<AxiosResponse<unknown>>
  shift(params: DailySlotShiftParams): Promise<AxiosResponse<unknown>>
  moveToDate(params: DailySlotMoveToDateParams): Promise<AxiosResponse<unknown>>
  create(body: DailySlotCreateBody): Promise<AxiosResponse<unknown>>
}


export class DailySlotEndpoint implements DailySlotEndPointDto {
  constructor(private readonly client: HttpClient) { }
  private readonly endpoint = 'daily/'
  private readonly endpointWithSlot = `${this.endpoint}slot/`
  private readonly endpointCreate = `${this.endpoint}marking/create`
  private endpointIgnoreSlot(slotId: string): string { return `${this.endpointWithSlot}${slotId}/ignore` }
  private endpointReconsiderSlot(slotId: string): string { return `${this.endpointWithSlot}${slotId}/reconsider` }
  private endpointShiftSlots({ slotId, date }: Omit<DailySlotShiftParams, 'body'>): string { return `${this.endpoint}${slotId}/${date}/shift` }
  private endpointMoveToDate(slotId: string): string { return `${this.endpointWithSlot}${slotId}/move-to-date` }

  async update({ body, slotId }: DailySlotUpdateParams): Promise<AxiosResponse<unknown>> {
    return await this.client.patch<DailySlotUpdateParams["body"], unknown>({
      url: `${this.endpoint}/${slotId}`, body
    })
  }
  async ignore({ slotId, body }: DailySlotIgnoreParams): Promise<AxiosResponse<unknown>> {
    return await this.client.post<DailySlotIgnoreParams["body"], unknown>({
      url: this.endpointIgnoreSlot(slotId), body
    })
  }
  async reconsider({ slotId, body }: DailySlotReconsiderParams): Promise<AxiosResponse<unknown>> {
    return await this.client.post<DailySlotReconsiderParams["body"], unknown>({
      url: this.endpointReconsiderSlot(slotId), body
    })
  }
  async shift({ slotId, date, body }: DailySlotShiftParams): Promise<AxiosResponse<unknown>> {
    return await this.client.post<DailySlotShiftParams["body"], unknown>({
      url: this.endpointShiftSlots({ slotId, date }), body
    })
  }
  async moveToDate({ body, slotId }: DailySlotMoveToDateParams) {
    return await this.client.post<DailySlotMoveToDateParams["body"], unknown>({
      url: this.endpointMoveToDate(slotId), body
    })
  }
  async create(body: DailySlotCreateBody) {
    return await this.client.post<DailySlotCreateBody, unknown>({
      url: this.endpointCreate, body
    })
  }
}
