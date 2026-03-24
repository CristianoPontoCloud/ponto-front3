import type { LoginResponse } from "@/domain/authentication/signin"
import { StatusDefaultEnum } from "@/domain/usecases/status-default"
import { faker } from "@faker-js/faker"
import { NextResponse } from "next/server"
import { v4 } from "uuid"

export async function POST() {
  const data: LoginResponse = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjM4NzMzMy04YWE4LTQzMGUtYjU5Yy02ZWUwYjYzMzYxN2UiLCJ1c2VybmFtZSI6InN5c3RlbWFkbWluIiwiY29sbGFib3JhdG9ySWQiOm51bGwsImNvbXBhbnlJZCI6bnVsbCwiYWRtaW4iOm51bGwsImhhc0NwZiI6dHJ1ZSwib3JpZ2luIjoid2ViIiwiaWF0IjoxNzQ5MDMwODMxLCJleHAiOjE3NDkwMzQ0MzF9.iVFY6QTYVKM5B4B62fE2ZAbtBpC0tyQ2etcNHwn-CUU",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjM4NzMzMy04YWE4LTQzMGUtYjU5Yy02ZWUwYjYzMzYxN2UiLCJ1c2VybmFtZSI6InN5c3RlbWFkbWluIiwiY29sbGFib3JhdG9ySWQiOm51bGwsImNvbXBhbnlJZCI6bnVsbCwiYWRtaW4iOm51bGwsImhhc0NwZiI6dHJ1ZSwib3JpZ2luIjoid2ViIiwiaWF0IjoxNzQ5MDMwODMxLCJleHAiOjE3NDk2MzU2MzF9.-Xh4BbcssO2ZLPnL7aC22ChZOCgoy4AvzMeVSY9y0xY",
    collaborator: {
      id: v4(),
      cpf: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.firstName(),
      phone: `${faker.number.int({ min: 10, max: 99 })}${faker.number.int({ min: 10000000, max: 99999999 })}`,
      position: {
        id: v4(),
        name: faker.person.jobTitle()
      },
      status: StatusDefaultEnum.active
    },
    company: {
      id: v4(),
      cnpj: `${faker.number.int({ min: 10000000, max: 99999999 })}${faker.number.int({ min: 1000, max: 9999 })}`,
      fantasyName: faker.company.name(),
      name: faker.company.name(),
      startDay: 1,
      status: StatusDefaultEnum.active
    },
    companyGroups: [
      {
        branches: [
          {
            cnpj: `${faker.number.int({ min: 10000000, max: 99999999 })}${faker.number.int({ min: 1000, max: 9999 })}`,
            collaboratorId: v4(),
            companyFantasyName: faker.company.name(),
            companyName: faker.company.name(),
            companyId: v4(),
            parentCompanyId: v4()
          }
        ],
        headquarters: {
          isHeadquarters: true,
          cnpj: `${faker.number.int({ min: 10000000, max: 99999999 })}${faker.number.int({ min: 1000, max: 9999 })}`,
          collaboratorId: v4(),
          companyFantasyName: faker.company.name(),
          companyName: faker.company.name(),
          companyId: v4(),
        },
        totalCollaboratorsInGroup: 1
      }
    ],
    loginMetadata: {
      identifierType: "",
      identifierValue: "",
      loginMethod: "",
      timestamp: ""
    },
    requiresCompanySelection: true,
    requiresPasswordSetup: true,
    user: {
      id: v4(),
      cpf: `${faker.number.int({ min: 10000000000, max: 99999999999 })}`,
      email: faker.internet.email(),
      phone: `${faker.number.int({ min: 10, max: 99 })}${faker.number.int({ min: 10000000, max: 99999999 })}`,
      username: faker.internet.email(),
      status: StatusDefaultEnum.active
    },
  }
  return await NextResponse.json(data)
}
