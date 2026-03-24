import type { ExportLayout, ExportLayoutFormProps } from "@/domain/entities/exports/exports";
import { type ExportFields, ExportFieldsEnum, exportFieldsEnumMap } from "@/domain/entities/exports/exports-fields";
import type { CreateDto, EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";


type PaginationExport = PaginationDto<ExportLayout[]>

interface ExportFacadeDto {
  // findAll(params?: FilteredParamsDto): Promise<PaginationExport>
  findById(collaboratorId: string): Promise<ExportLayout | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationExport>
  create(body: CreateDto<ExportLayoutFormProps>): Promise<ExportLayout | null>
  update(body: EditDto<ExportLayoutFormProps>): Promise<ExportLayout | null>
  delete(requestId: string): Promise<void>
}

export class ExportFacade implements ExportFacadeDto {

  private createNewFieldUseCase(): ExportFields {
    const params = exportFieldsEnumMap[Math.floor(Math.random() * exportFieldsEnumMap.length)]
    const { type } = params;
    const defaultFields = {
      ...params,
      size: "",
      startPosition: "",
      endPosition: "",
    };
    const fieldsCases = {
      [ExportFieldsEnum.TEXT]: {
        ...defaultFields,
        text: "",
      },
      [ExportFieldsEnum.DATE]: {
        ...defaultFields,
        fill: "",
        align: "",
        format: "",
      },
      [ExportFieldsEnum.DECIMAL]: {
        ...defaultFields,
        fill: "",
        align: "",
        decimalPlaces: "",
      },
      [ExportFieldsEnum.DEFAULT]: {
        ...defaultFields,
        fill: "",
        align: "",
      },
    };
    return fieldsCases[type];
  }
  private mockExport(companyId: string, exportId?: string): ExportLayout {
    return {
      id: exportId ? exportId : v4(),
      name: faker.commerce.productName(),
      footer: "",
      header: "",
      hourFormated: "",
      lastModify: {
        date: new Date(),
        time: "07:00",
        user: faker.person.fullName()
      },
      nightFactor: false,
      extraFactor: false,
      reportType: "",
      separatedDecimal: "",
      separatedFields: "",
      downloadUrl: "",
      createdAt: "",
      deletedAt: "",
      deletedBy: "",
      updatedAt: "",
      events: Array.from({ length: faker.number.int({ min: 1, max: 20 }) }).map(() => ({
        name: faker.commerce.product(),
        align: "",
        code: "",
        decimals: "",
        fill: "",
      })),
      fields: Array.from({ length: faker.number.int({ min: 1, max: 20 }) }).map(() => this.createNewFieldUseCase()),
      companyId
    }
  }
  async findById(exportId: string): Promise<ExportLayout | null> {
    return this.mockExport(exportId)
  }
  async filtered(): Promise<PaginationExport> {
    return {
      lastPage: 1,
      page: 1,
      total: 1,
      success: true,
      data: Array.from({ length: 20 }).map(() => this.mockExport(v4()))
    }
  }
  async create(body: CreateDto<ExportLayoutFormProps>): Promise<ExportLayout | null> {
    return {
      ...this.mockExport(v4()),
      ...body
    }
  }
  async update(body: EditDto<ExportLayoutFormProps>): Promise<ExportLayout | null> {
    return {
      ...this.mockExport(v4()),
      ...body
    }
  }
  async delete(): Promise<void> {
    return
  }
}
