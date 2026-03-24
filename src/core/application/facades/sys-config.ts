import type { SysConfigParameters } from "@/domain/entities/sys-config";
import type { SysConfigLoadAndSaveParametersUseCase } from "../usecases/sys-config/load-and-save-sys-config-parameters";
import type { SysConfigFindParametersUseCase } from "../usecases/sys-config/sys-config-find-parameter";

interface SysConfigFacadeDto {
  findParameters(): Promise<SysConfigParameters | null>
  loadAndSaveParameters(): Promise<void>
}

export class SysConfigFacade implements SysConfigFacadeDto {
  constructor(
    private readonly findParametersUseCase: SysConfigFindParametersUseCase,
    private readonly loadAndSaveParametersUseCase: SysConfigLoadAndSaveParametersUseCase,
  ) { }
  async findParameters(): Promise<SysConfigParameters | null> {
    return await this.findParametersUseCase.execute()
  }
  async loadAndSaveParameters(): Promise<void> {
    return await this.loadAndSaveParametersUseCase.execute()
  }
}
