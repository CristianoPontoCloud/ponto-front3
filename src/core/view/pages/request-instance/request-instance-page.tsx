"use client";
import { requestInstanceFacadeFactory } from "@/application/factories/request-instace-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { RequestInstanceDetails } from "@/domain/entities/request-instance/request-instance";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { ScopeEnum } from "@/domain/scope";
import DataManager from "@/view/components/data-manager/data-manager";
import { RequestInstanceHeaderSheetForm } from "@/view/components/forms/request-instance/request-instance-header-sheet-form";
import { RequestInstanceSheetForm } from "@/view/components/forms/request-instance/request-instance-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { Building2, User } from "lucide-react";
import { useRef } from "react";
import { useRequestInstancePage } from "./use-request-instance-page";

export function RequestInstancePage({
	requests,
}: { requests: PaginationDto<RequestInstanceDetails[]> }) {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	const { columns, closeSheet, form } = useRequestInstancePage();

	return (

		<div className="flex flex-col  max-h-full">
			<div className="flex justify-between pb-4 items-center" ref={headerRef}>
				<h1 className="text-2xl font-semibold">Solicitações</h1>
				<DataManager
					sheetParams={{
						title: <RequestInstanceHeaderSheetForm />,
						labelOpenSheet: "Solicitação",
						FormComponent: <RequestInstanceSheetForm closeSheet={closeSheet} />,
						sheetMinWidth: "447px",
						form,
					}}
					filterParams={{
						customFieldName: "scope",
						customFilters: [
							{
								label: "Minhas",
								value: ScopeEnum.MY,
								icon: <User className="w-4 h-4" />,
							},
							{
								label: "Empresa",
								value: ScopeEnum.COMPANY,
								icon: <Building2 className="w-4 h-4" />,
							},
						],
					}}
				/>
			</div>
			<InfinityQueryProvider<RequestInstanceDetails>
				queryKey={"request-instance"}
				initialData={requests}
				facadeFactory={requestInstanceFacadeFactory}
			>
				<InfinityTable<RequestInstanceDetails>
					columns={columns}
					entity="solicitação"
					pronoun="female"
					heightTable={height - 15}
				/>
			</InfinityQueryProvider>
		</div>
	);
}
