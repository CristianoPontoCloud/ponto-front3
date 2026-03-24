import type { Receipts, ReceiptsGenerate } from "@/domain/entities/receipts/receipts";
import type { FilteredParamsDto, ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ReceiptsFilteredUseCaseDto } from "../usecases/receipts/requests-filtered";
import type { ReceiptsGenerateUseCaseDto } from "../usecases/receipts/requests-generate";

type PaginationReceipts = PaginationDto<Receipts[]>
type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>

interface ReceiptsFacadeDto {
  filtered(params?: FilteredParamsDto): Promise<PaginationReceipts>
  generate(body: ReceiptsGenerate): Promise<SocketMetadateResponse>
}

export class ReceiptsFacade implements ReceiptsFacadeDto {
  constructor(
    private readonly filteredUseCase: ReceiptsFilteredUseCaseDto,
    private readonly generateUseCase: ReceiptsGenerateUseCaseDto,
  ) { }

  async filtered(params?: FilteredParamsDto): Promise<PaginationReceipts> {
    return await this.filteredUseCase.execute(params)
  }
  async generate(body: ReceiptsGenerate): Promise<SocketMetadateResponse> {
    return await this.generateUseCase.execute(body)
  }

}
