import type { AccessProfile, AccessProfileFormProps } from "@/domain/entities/access-profile";
import type { EditDto, FilteredParamsDto } from "@/domain/http/http-client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";


type PaginationAccessProfile = PaginationDto<AccessProfile[]>

interface AccessProfileFacadeDto {
  // findAll(params?: FilteredParamsDto): Promise<PaginationAccessProfile>
  // findById(companyId: string): Promise<MarkingDetails | null>
  filtered(params?: FilteredParamsDto): Promise<PaginationAccessProfile>
  // create(body: CreateDto<MarkingFormProps>): Promise<Marking | null>
  // update(body: EditDto<MarkingFormProps>): Promise<Marking | null>
  // delete(markingId: string): Promise<void>
}

export class AccessProfileFacade implements AccessProfileFacadeDto {
  // constructor(
  //   // private readonly findAllUseCase: MarkingsFindAllUseCaseDto,
  //   // private readonly findByIdUseCase: MarkingsFindByIdUseCaseDto,
  //   private readonly filteredUseCase: MarkingsFilteredUseCaseDto,
  //   private readonly createUseCase: MarkingCreatedUseCaseDto,
  //   private readonly updateUseCase: MarkingUpdateUseCaseDto,
  //   private readonly deleteUseCase: MarkingDeleteUseCaseDto,
  // ) { }
  // async findAll(params?: FilteredParamsDto): Promise<PaginationMarking> {
  //   return await this.findAllUseCase.execute(params)
  // }
  private randomBoolean(): boolean {
    return faker.number.int({ max: 99 }) % 2 === 0
  }
  private makeAccessProfile(id?: string): AccessProfile {
    return {
      id: id ?? uuidv4(),
      name: faker.person.jobArea(),
      collaborators: Array.from({ length: faker.number.int({ max: 20 }) }).map(() => uuidv4()),
      mobile: {
        badge: this.randomBoolean(),
        barCode: this.randomBoolean(),
        biometricRecognition: this.randomBoolean(),
        hasAccess: this.randomBoolean(),
        photo: this.randomBoolean(),
        pin: this.randomBoolean(),
        pointMark: this.randomBoolean(),
        qrCode: this.randomBoolean(),
        throwJustify: this.randomBoolean(),
        facialRecognition: this.randomBoolean(),
      },
      web: {
        badge: this.randomBoolean(),
        barCode: this.randomBoolean(),
        biometricRecognition: this.randomBoolean(),
        hasAccess: this.randomBoolean(),
        photo: this.randomBoolean(),
        pin: this.randomBoolean(),
        pointMark: this.randomBoolean(),
        qrCode: this.randomBoolean(),
        throwJustify: this.randomBoolean(),
        facialRecognition: this.randomBoolean(),
      },
      status: this.randomBoolean() ? StatusDefaultEnum.active : StatusDefaultEnum.inactive
    }
  }
  async filtered(): Promise<PaginationAccessProfile> {
    return {
      lastPage: 1,
      page: 1,
      success: true,
      total: 1,
      data: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => this.makeAccessProfile()),
    }
  }
  async update(body: EditDto<AccessProfileFormProps>): Promise<AccessProfile | null> {
    return { ...this.makeAccessProfile(), ...body, }
  }
  async findById(accessProfileId: string): Promise<AccessProfile | null> {
    return this.makeAccessProfile(accessProfileId)
  }
  async delete(accessProfileId: string): Promise<void> {
    return console.log(accessProfileId)
  }

}
