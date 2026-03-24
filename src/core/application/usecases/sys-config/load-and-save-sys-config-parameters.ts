import type { AbstractionIDB } from "@/application/indexed-db/indexed-db";
import type { TokenJWT } from "@/domain/authentication/signin";
import type { SysConfigFindParametersUseCase } from "./sys-config-find-parameter";

export interface SysConfigLoadAndSaveParametersUseCaseDto {
  execute(): Promise<void>
}

export class SysConfigLoadAndSaveParametersUseCase implements SysConfigLoadAndSaveParametersUseCaseDto {
  constructor(
    private readonly findParametersUseCase: SysConfigFindParametersUseCase,
    private readonly createIndexedDbConection: (userId: string) => Promise<AbstractionIDB>,
    private readonly token: string,
    private readonly tokenDecoder: (token: string) => TokenJWT | null,
  ) { }

  async execute(): Promise<void> {
    const decodedToken = this.tokenDecoder(this.token);
    if (!decodedToken) {
      throw new Error("invalid token");
    }
    const res = await this.findParametersUseCase.execute();
    if (!res) {
      throw new Error("invalid response");
    }
    const indexedDbConnection = await this.createIndexedDbConection(decodedToken.sub);
    await indexedDbConnection.saveValue("sys-config", {
      key: "parameters",
      value: res,
    });
  }
}
