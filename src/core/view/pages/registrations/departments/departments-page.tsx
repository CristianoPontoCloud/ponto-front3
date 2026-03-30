"use client";
import { departmentsFacadeFactory } from "@/application/factories/registrations/department-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Department } from "@/domain/entities/department";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import DepartmentSheetForm from "@/view/components/forms/registrations/department/department-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useDepartmentsPage } from "./use-departments-page";

interface DepartmentsPageParams {
	departments: PaginationDto<Department[]>;
}

export default function DepartmentsPage({ departments }: DepartmentsPageParams) {
	const { columns, form, closeSheet } = useDepartmentsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<div className="w-full h-full flex flex-col gap-4 ">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} departamento`,
						form: form,
						FormComponent: <DepartmentSheetForm closeSheet={() => closeSheet()} />,
						labelOpenSheet: "Departamento",
						sheetWidth: "30vw",
						sheetMinWidth: "410px",
					}}
				/>
			</div>
			<InfinityQueryProvider<Department>
				queryKey="department"
				facadeFactory={departmentsFacadeFactory}
				initialData={departments}
			>
				<InfinityTable<Department>
					columns={columns}
					heightTable={height - 30}
					entity="departamento"
				/>
			</InfinityQueryProvider>
		</div>
	);
}
