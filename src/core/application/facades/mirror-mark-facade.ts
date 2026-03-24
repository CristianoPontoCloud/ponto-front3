import type { MirrorMark, MirrorMarkGenerate } from "@/domain/entities/mirror-mark/mirror-mark";
import type { FilteredParamsDto, ResponseDto, WebSocketResponse } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { MirrorMarkFilteredUseCase } from "../usecases/mirror-mark/mirror-mark-filtered";
import type { MirrorMarkGenerateUseCase } from "../usecases/mirror-mark/mirror-mark-generate";

type PaginationMirrorMark = PaginationDto<MirrorMark[]>
type SocketMetadateResponse = ResponseDto<WebSocketResponse | null>


interface MirrorMarkFacadeDto {
  filtered(params?: FilteredParamsDto): Promise<PaginationMirrorMark>
  generate(body: MirrorMarkGenerate): Promise<SocketMetadateResponse>
}

export class MirrorMarkFacade implements MirrorMarkFacadeDto {
  constructor(
    private readonly filteredUseCase: MirrorMarkFilteredUseCase,
    private readonly generateUseCase: MirrorMarkGenerateUseCase,
  ) { }

  async filtered(params?: FilteredParamsDto): Promise<PaginationMirrorMark> {
    return await this.filteredUseCase.execute(params)
  }
  async generate(body: MirrorMarkGenerate): Promise<SocketMetadateResponse> {
    return await this.generateUseCase.execute(body)
  }
}
