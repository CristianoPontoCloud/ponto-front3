"use client";
import { companiesFacadeFactory } from "@/application/factories/companies-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Company } from "@/domain/entities/companies";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { CompaniesLayoutSheetForm } from "@/view/components/forms/companies/companies-layout-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useCompaniesPage } from "./use-companies-page";
interface CompaniesPageParams {
	companies: PaginationDto<Company[]>;
}
export default function CompaniesPage({ companies }: CompaniesPageParams) {
	const { columns, form, closeSheet } = useCompaniesPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (
		<InfinityQueryProvider<Company>
			queryKey="company"
			initialData={companies}
			facadeFactory={companiesFacadeFactory}
			sendParentCompanyId
		>
			<div className="flex flex-col  max-h-full">
				<div className="flex justify-between pb-4 items-center" ref={headerRef}>
					<h1 className="text-2xl font-semibold">Empresas</h1>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} empresa`,
							labelOpenSheet: "Empresa",
							FormComponent: <CompaniesLayoutSheetForm closeSheet={() => closeSheet()} />,
							sheetMinWidth: "900px",
							form,
						}}
					/>
				</div>
				<InfinityTable<Company>
					columns={columns}
					entity="empresa"
					pronoun="female"
					heightTable={height - 15}
				/>
			</div>
		</InfinityQueryProvider>
	);
}
