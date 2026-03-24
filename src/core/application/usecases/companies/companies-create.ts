import type { CompanyFormProps, CreateCompanyResponse } from "@/domain/entities/companies";
import type { CreateDto } from "@/domain/http/http-client";
import type { CompaniesEndpoint } from "@/infra/apis/ponto-cloud-client-side/companies";
import { signIn } from "next-auth/react";


export interface CompaniesCreatedUseCaseDto {
  execute(body: CreateDto<CompanyFormProps>): Promise<CreateCompanyResponse | null>
}

export class CompaniesCreatedUseCase implements CompaniesCreatedUseCaseDto {
  constructor(
    private readonly endpoint: CompaniesEndpoint,
  ) { }

  async execute(body: CreateDto<CompanyFormProps>): Promise<CreateCompanyResponse | null> {
    const res = await this.endpoint.create(body)
    await signIn("credentials", {
      token: res.data.refreshToken,
      redirect: false
    })
    return res?.data ?? null
  }
}
