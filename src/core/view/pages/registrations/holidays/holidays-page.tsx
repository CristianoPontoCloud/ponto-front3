"use client";
import { holidaysFacadeFactory } from "@/application/factories/registrations/holidays-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Holiday } from "@/domain/entities/holiday";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import HolidaySheetForm from "@/view/components/forms/registrations/holiday/holiday-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useHolidaysPage } from "./use-holidays-page";
interface HolidaysPageParams {
	holidays: PaginationDto<Holiday[]>;
}
export default function HolidaysPage({ holidays }: HolidaysPageParams) {
	const { columns, form, closeSheet } = useHolidaysPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<InfinityQueryProvider<Holiday>
			queryKey="holiday"
			facadeFactory={holidaysFacadeFactory}
			initialData={holidays}
		>
			<div className="w-full h-full flex flex-col gap-4">
				<div ref={headerRef}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} feriado`,
							FormComponent: <HolidaySheetForm closeSheet={() => closeSheet()} />,
							labelOpenSheet: "Feriado",
							sheetWidth: "22vw",
							sheetMinWidth: "410px",
							form,
						}}
					/>
				</div>
				<InfinityTable<Holiday> columns={columns} heightTable={height - 30} entity="feriado" />
			</div>
		</InfinityQueryProvider>
	);
}
