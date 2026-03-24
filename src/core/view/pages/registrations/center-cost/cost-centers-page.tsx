"use client";
import { costcentersFacadeFactory } from "@/application/factories/registrations/costcenter-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { CostCenter } from "@/domain/entities/center-cost";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import CostCenterSheetForm from "@/view/components/forms/registrations/cost-center/cost-center-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useCostCentersPage } from "./use-cost-centers-page";

interface CostCentersPageParams {
	costCenters: PaginationDto<CostCenter[]>;
}
export default function CostCentersPage({ costCenters }: CostCentersPageParams) {
	const { form, columns, closeSheet } = useCostCentersPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (
		<InfinityQueryProvider<CostCenter>
			queryKey="center-cost"
			facadeFactory={costcentersFacadeFactory}
			initialData={costCenters}
		>
			<div className="w-full h-full flex flex-col gap-4 ">
				<div ref={headerRef}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} centro de custo`,
							FormComponent: <CostCenterSheetForm closeSheet={() => closeSheet()} />,
							labelOpenSheet: "Centro de custo",
							sheetWidth: "22vw",
							sheetMinWidth: "410px",
							form,
						}}
					/>
				</div>
				<div className="flex flex-col h-full justify-between">
					<InfinityTable<CostCenter>
						heightTable={height - 30}
						columns={columns}
						entity="centro de custo"
					/>
				</div>
			</div>
		</InfinityQueryProvider>
	);
}
