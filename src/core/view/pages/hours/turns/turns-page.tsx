"use client";
import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Turn, TurnDetails } from "@/domain/entities/turns/turns";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { TurnsLayoutSheetForm } from "@/view/components/forms/hours/turn/turns-layout-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import { useTurnsPage } from "./use-turns-page";
interface TurnsPageParams {
	turns: PaginationDto<Turn[]>;
}
export default function TurnsPage({ turns }: TurnsPageParams) {
	const { columns, form, closeSheet } = useTurnsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (
		<div className="w-full h-full flex flex-col gap-4">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} turno`,
						FormComponent: (
							<FormProvider {...form}>
								<TurnsLayoutSheetForm closeSheet={() => closeSheet()} />
							</FormProvider>
						),
						labelOpenSheet: "Turno",
						sheetMinWidth: "96vw",
						form,
					}}
				/>
			</div>
			<InfinityQueryProvider<Turn>
				queryKey="work-shift"
				initialData={turns}
				facadeFactory={turnsFacadeFactory}
			>
				<InfinityTable<TurnDetails> columns={columns} heightTable={height - 30} entity="turno" />
			</InfinityQueryProvider>
		</div>
	);
}
