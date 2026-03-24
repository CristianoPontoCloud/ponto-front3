import { departmentsFacadeFactory } from "@/application/factories/registrations/department-facade-factory";
import { getToken } from "@/application/helpers/get-token";
import { safePaginationCall } from "@/application/usecases/safe-pagination-call";
import DepartmentsPage from "@/view/pages/registrations/departments/departments-page";

export default async function Departments() {
	const token = await getToken();
	const departments = await safePaginationCall({
		facadeFactory: departmentsFacadeFactory,
		token,
	});

	return <DepartmentsPage departments={departments} />;
}
