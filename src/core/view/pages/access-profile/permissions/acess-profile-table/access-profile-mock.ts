import { AccessLevelEnum } from "@/domain/entities/permission";

export interface AccessProfileRole {
  name: string;
  superAdmin: AccessLevelEnum;
  administrator: AccessLevelEnum;
  supervisor: AccessLevelEnum;
  collaborator: AccessLevelEnum;
}

export const accessProfilesMockRoles: AccessProfileRole[] = [
  {
    name: "Marcação de ponto",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.FULL_ACCESS,
    collaborator: AccessLevelEnum.FULL_ACCESS,
  },
  {
    name: "Colaboradores",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Cadastros",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Turnos",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Apurações",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Histórico de ponto",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.FULL_ACCESS,
    collaborator: AccessLevelEnum.FULL_ACCESS,
  },
  {
    name: "Solicitações pendentes",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Ocorrências pendentes",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Minhas colicitações",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.FULL_ACCESS,
  },
  {
    name: "Comprovantes",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.FULL_ACCESS,
  },
  {
    name: "Meus comprovantes",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.FULL_ACCESS,
  },
  {
    name: "Relatórios fiscais",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Relatórios gerenciais",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
  {
    name: "Integrações",
    superAdmin: AccessLevelEnum.FULL_ACCESS,
    administrator: AccessLevelEnum.FULL_ACCESS,
    supervisor: AccessLevelEnum.READ,
    collaborator: AccessLevelEnum.DENIED,
  },
];
