"use client";
import { occurrencesFacadeFactory } from "@/application/factories/registrations/occurrences-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Occurrence } from "@/domain/entities/occurrence";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import OccurrenceSheetForm from "@/view/components/forms/registrations/occurence/occurrence-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useOccurrencesPage } from "./use-occurrence-page";

interface OccurrencesPageParams {
	occurrences: PaginationDto<Occurrence[]>;
}

export default function OccurrencesPage({ occurrences }: OccurrencesPageParams) {
	const { columns, form, closeSheet } = useOccurrencesPage();
	const headerRef = useRef<HTMLDivElement>(null);
	const heightTable = useBottomOffset(headerRef);

	return (
		<div className="w-full h-full flex flex-col gap-4 ">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} ocorrência`,
						FormComponent: <OccurrenceSheetForm closeSheet={() => closeSheet()} />,
						labelOpenSheet: "Ocorrência",
						sheetWidth: "22vw",
						sheetMinWidth: "410px",
						form,
					}}
				/>
			</div>
			<InfinityQueryProvider<Occurrence>
				queryKey="occurrence"
				facadeFactory={occurrencesFacadeFactory}
				initialData={occurrences}
			>
				<InfinityTable<Occurrence>
					columns={columns}
					heightTable={heightTable - 30}
					entity="ocorrência"
					pronoun="female"
				/>
			</InfinityQueryProvider>
		</div>
	);
}
