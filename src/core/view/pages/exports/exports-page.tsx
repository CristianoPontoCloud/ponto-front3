"use client";
import { exportsFacadeFactory } from "@/application/factories/exports-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import { SheetOverSheetContentControllerProvider } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import type { ExportLayout } from "@/domain/entities/exports/exports";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { ExportHeaderSheetForm } from "@/view/components/forms/export/create-and-edit/export-header-sheet-form";
import { ExportSheetForm } from "@/view/components/forms/export/create-and-edit/export-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useExportsPage } from "./use-exports-page";

interface ExportPageParams {
	exports: PaginationDto<ExportLayout[]>;
}

function Exports({ exports }: ExportPageParams) {
	const { columns, closeSheet, formExportLayout } = useExportsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between mb-4 items-center" ref={headerRef}>
				<h1 className="text-2xl font-semibold">Exportações</h1>
				<DataManager
					sheetParams={{
						title: <ExportHeaderSheetForm />,
						labelOpenSheet: "Adicionar",
						FormComponent: <ExportSheetForm closeSheet={closeSheet} />,
						sheetMinWidth: "55vw",
						form: formExportLayout,
					}}
					rederingFilterController={false}
				/>
			</div>
			<InfinityQueryProvider<ExportLayout>
				initialData={exports}
				queryKey="exports"
				facadeFactory={exportsFacadeFactory}
			>
				<InfinityTable<ExportLayout>
					columns={columns}
					heightTable={height - 30}
					entity="colaborador"
				/>
			</InfinityQueryProvider>
		</div>
	);
}

export function ExportsPage({ exports }: ExportPageParams) {
	return (
		<SheetOverSheetContentControllerProvider>
			<Exports exports={exports} />
		</SheetOverSheetContentControllerProvider>
	);
}
