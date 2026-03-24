"use client";
import { equipmentsFacadeFactory } from "@/application/factories/registrations/equipments-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Equipment } from "@/domain/entities/equipment";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import EquimentSheetForm from "@/view/components/forms/registrations/equiment/equiment-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useEquipmentsPage } from "./use-equiments-page";

interface EquipmentsPageParams {
	equipments: PaginationDto<Equipment[]>;
}

export default function EquipmentsPage({ equipments }: EquipmentsPageParams) {
	const { form, columns, closeSheet } = useEquipmentsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<InfinityQueryProvider<Equipment>
			queryKey="equipment"
			facadeFactory={equipmentsFacadeFactory}
			initialData={equipments}
		>
			<div className="w-full h-full flex flex-col gap-4 ">
				<div ref={headerRef}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} equipamentos`,
							FormComponent: <EquimentSheetForm closeSheet={() => closeSheet()} />,
							form,
							labelOpenSheet: "Equipamento",
							sheetWidth: "40vw",
							sheetMinWidth: "441px",
							sheetMaxWidth: "50vw",
						}}
					/>
				</div>
				<InfinityTable<Equipment>
					columns={columns}
					heightTable={height - 30}
					entity="equipamento"
				/>
			</div>
		</InfinityQueryProvider>
	);
}
