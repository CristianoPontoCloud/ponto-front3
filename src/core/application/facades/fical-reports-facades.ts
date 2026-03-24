import type { AEJFormProps } from "@/domain/entities/fiscal-reports/AEJ"
import type { AFDFormProps } from "@/domain/entities/fiscal-reports/AFD"
import type { ResponseDto, WebSocketResponse } from "@/domain/http/http-client"
import type { FiscalReportsGenerateAEJUseCase } from "../usecases/fiscal-reports/fiscal-reports-generate-aej-use-case"
import type { FiscalReportsGenerateAFDUseCase } from "../usecases/fiscal-reports/fiscal-reports-generate-afd-use-case"


type ResponseWebSocket = ResponseDto<WebSocketResponse | null>

interface FiscalResportsFacadeDto {
  generateAEJ(params: AEJFormProps): Promise<ResponseWebSocket>
  generateAFD(params: AFDFormProps): Promise<ResponseWebSocket>
}

export class FiscalResportsFacade implements FiscalResportsFacadeDto {
  constructor(
    private readonly generateAEJUseCase: FiscalReportsGenerateAEJUseCase,
    private readonly generateAFDUseCase: FiscalReportsGenerateAFDUseCase,
  ) { }
  async generateAEJ(params: AEJFormProps): Promise<ResponseWebSocket> {
    return await this.generateAEJUseCase.execute(params)
  }
  async generateAFD(params: AFDFormProps): Promise<ResponseWebSocket> {
    return await this.generateAFDUseCase.execute(params)
  }
}
