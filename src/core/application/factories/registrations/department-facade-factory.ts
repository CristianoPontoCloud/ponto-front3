import { DepartmentsFacade } from "@/application/facades/registrations/departments-facade";
import { DepartmentsFindByIdUseCase } from "@/application/usecases/registrations/departments/department-find-by-id";
import { DepartmentsCreatedUseCase } from "@/application/usecases/registrations/departments/departments-create";
import { DepartmentsDeleteUseCase } from "@/application/usecases/registrations/departments/departments-delete";
import { DepartmentsFilteredUseCase } from "@/application/usecases/registrations/departments/departments-filtered";
import { DepartmentsFindAllUseCase } from "@/application/usecases/registrations/departments/departments-find-all";
import { DepartmentsFindAllCompanyManagersUseCase } from "@/application/usecases/registrations/departments/departments-find-all-company-managers";
import { DepartmentsUpdateUseCase } from "@/application/usecases/registrations/departments/departments-update";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { DepartmentsEndpoint } from "@/infra/apis/ponto-cloud-client-side/registrations/departments";

export function departmentsFacadeFactory(token: string): DepartmentsFacade {
  const endpoint = new DepartmentsEndpoint(createPontoCloudApi(token))
  const findAllUseCase = new DepartmentsFindAllUseCase(endpoint)
  const findAllCompanyManagersUseCase = new DepartmentsFindAllCompanyManagersUseCase(endpoint)
  const filteredUseCase = new DepartmentsFilteredUseCase(endpoint)
  const findByIdUseCase = new DepartmentsFindByIdUseCase(endpoint)
  const createUseCase = new DepartmentsCreatedUseCase(endpoint)
  const updateUseCase = new DepartmentsUpdateUseCase(endpoint)
  const deleteUseCase = new DepartmentsDeleteUseCase(endpoint)

  return new DepartmentsFacade(findAllUseCase, findAllCompanyManagersUseCase, findByIdUseCase, filteredUseCase, createUseCase, updateUseCase, deleteUseCase)
}
