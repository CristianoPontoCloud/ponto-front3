import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { ReceiptsEndpoint } from "@/infra/apis/ponto-cloud-client-side/receipts";
import { ReceiptsFacade } from "../facades/receipts-facade";
import { ReceiptsFilteredUseCase } from "../usecases/receipts/requests-filtered";
import { ReceiptsGenerateUseCase } from "../usecases/receipts/requests-generate";

export function receiptsFacadeFactory(token: string): ReceiptsFacade {
  const endpoint = new ReceiptsEndpoint(createPontoCloudApi(token))
  const filteredUseCase = new ReceiptsFilteredUseCase(endpoint)
  const generateUseCase = new ReceiptsGenerateUseCase(endpoint)

  return new ReceiptsFacade(filteredUseCase, generateUseCase)
}
