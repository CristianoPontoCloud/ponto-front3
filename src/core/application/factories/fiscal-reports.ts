import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { FiscalReportsEndpoint } from "@/infra/apis/ponto-cloud-client-side/fiscal-reports";
import { FiscalResportsFacade } from "../facades/fical-reports-facades";
import { FiscalReportsGenerateAEJUseCase } from "../usecases/fiscal-reports/fiscal-reports-generate-aej-use-case";
import { FiscalReportsGenerateAFDUseCase } from "../usecases/fiscal-reports/fiscal-reports-generate-afd-use-case";

export function fiscalReportsFacadeFactory(token: string): FiscalResportsFacade {
  const endpoint = new FiscalReportsEndpoint(createPontoCloudApi(token))
  const generateAEJUseCase = new FiscalReportsGenerateAEJUseCase(endpoint)
  const generateAFDUseCase = new FiscalReportsGenerateAFDUseCase(endpoint)
  return new FiscalResportsFacade(generateAEJUseCase, generateAFDUseCase)
}
