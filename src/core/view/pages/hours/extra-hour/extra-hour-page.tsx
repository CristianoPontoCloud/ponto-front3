"use client";
import { extraHoursFacadeFactory } from "@/application/factories/hours/extra-hours-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { ExtraHour } from "@/domain/entities/extra-hour/extra-hour";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { ExtraHourLayoutSheetForm } from "@/view/components/forms/hours/extra-hour/extra-hour-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useExtraHourPage } from "./use-extra-hour-page";

interface ExtraHourPageParams {
	extraHours: PaginationDto<ExtraHour[]>;
}

export default function ExtraHourPage({ extraHours }: ExtraHourPageParams) {
	const { columns, form, closeSheet } = useExtraHourPage();
	const ref = useRef<HTMLDivElement>(null);
	const heightTable = useBottomOffset(ref);

	return (
		<InfinityQueryProvider<ExtraHour>
			queryKey="extra-hour"
			facadeFactory={extraHoursFacadeFactory}
			initialData={extraHours}
		>
			<div className="w-full h-full flex flex-col gap-4">
				<div ref={ref}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} hora extra`,
							FormComponent: <ExtraHourLayoutSheetForm closeSheet={() => closeSheet()} />,
							labelOpenSheet: "Hora extra",
							sheetMinWidth: "96vw",
							form,
						}}
					/>
				</div>
				<InfinityTable<ExtraHour>
					columns={columns}
					heightTable={heightTable - 30}
					entity="horas extras"
				/>
			</div>
		</InfinityQueryProvider>
	);
}
