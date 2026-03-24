"use client";
import { dismissalsFacadeFactory } from "@/application/factories/registrations/dimsissals-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Dismissal } from "@/domain/entities/dismissal";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import DismissalSheetForm from "@/view/components/forms/registrations/dismissal/dismissal-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useDismissalsPage } from "./use-dismissals-page";
interface DismissalsPageParams {
	dismissals: PaginationDto<Dismissal[]>;
}
export default function DismissalsPage({ dismissals }: DismissalsPageParams) {
	const { form, columns, closeSheet } = useDismissalsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<InfinityQueryProvider<Dismissal>
			queryKey="dismissal"
			facadeFactory={dismissalsFacadeFactory}
			initialData={dismissals}
		>
			<div className="w-full h-full flex flex-col gap-4 ">
				<div ref={headerRef}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} motivo de demissão`,
							FormComponent: <DismissalSheetForm closeSheet={() => closeSheet()} />,
							form,
							labelOpenSheet: "Motivo de demissão",
							sheetWidth: "23.5vw",
							sheetMinWidth: "441px",
						}}
					/>
				</div>
				<InfinityTable<Dismissal>
					columns={columns}
					entity="motivo de demissão"
					heightTable={height - 30}
				/>
			</div>
		</InfinityQueryProvider>
	);
}
