import type { MirrorMark, MirrorMarkGenerateParams } from "@/domain/entities/mirror-mark/mirror-mark";
import type { FilteredParamsDto, ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { MirrorMarkFilteredUseCase } from "../usecases/mirror-mark/mirror-mark-filtered";
import type { MirrorMarkGenerateParamsUseCase } from "../usecases/mirror-mark/mirror-mark-generate";

type PaginationMirrorMark = PaginationDto<MirrorMark[]>
type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>


interface MirrorMarkFacadeDto {
  filtered(params?: FilteredParamsDto): Promise<PaginationMirrorMark>
  generate(body: MirrorMarkGenerateParams): Promise<SocketMetadateResponse>
}

export class MirrorMarkFacade implements MirrorMarkFacadeDto {
  constructor(
    private readonly filteredUseCase: MirrorMarkFilteredUseCase,
    private readonly generateUseCase: MirrorMarkGenerateParamsUseCase,
  ) { }

  async filtered(params?: FilteredParamsDto): Promise<PaginationMirrorMark> {
    return await this.filteredUseCase.execute(params)
  }
  async generate(body: MirrorMarkGenerateParams): Promise<SocketMetadateResponse> {
    return await this.generateUseCase.execute(body)
  }
}
