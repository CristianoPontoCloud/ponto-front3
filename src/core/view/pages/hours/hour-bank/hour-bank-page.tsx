"use client";
import { hourBanksFacadeFactory } from "@/application/factories/hours/hour-banks-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { HourBank } from "@/domain/entities/hour-bank";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { HourBankSheetForm } from "@/view/components/forms/hours/hour-bank/hour-bank-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useHourBankPage } from "./use-hour-bank-page";
interface HourBankPageParams {
	hourbanks: PaginationDto<HourBank[]>;
}
export default function HourBankPage({ hourbanks }: HourBankPageParams) {
	const { columns, form, closeSheet } = useHourBankPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	return (

		<div className="w-full h-full flex flex-col gap-4">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} banco de horas`,
						FormComponent: <HourBankSheetForm closeSheet={() => closeSheet()} />,
						labelOpenSheet: "Banco de horas",
						sheetWidth: "410px",
						sheetMinWidth: "410px",
						form,
					}}
				/>
			</div>
			<InfinityQueryProvider<HourBank>
				queryKey="hour-bank"
				facadeFactory={hourBanksFacadeFactory}
				initialData={hourbanks}
			>
				<InfinityTable<HourBank>
					columns={columns}
					heightTable={height - 30}
					entity="banco de horas"
				/>
			</InfinityQueryProvider>
		</div>
	);
}
