"use client";
import { requestsFacadeFactory } from "@/application/factories/registrations/requests-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Request } from "@/domain/entities/request";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import RequestSheetForm from "@/view/components/forms/registrations/request/request-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useRequestsPage } from "./use-requests-page";
interface RequestsPageParams {
	requests: PaginationDto<Request[]>;
}
export default function RequestsPage({ requests }: RequestsPageParams) {
	const { form, columns, closeSheet } = useRequestsPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<div className="w-full h-full flex flex-col gap-4 ">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} solicitação`,
						FormComponent: <RequestSheetForm closeSheet={() => closeSheet()} />,
						labelOpenSheet: "Solicitação",
						sheetWidth: "32vw",
						sheetMinWidth: "410px",
						form,
					}}
				/>
			</div>
			<InfinityQueryProvider<Request>
				queryKey="request"
				facadeFactory={requestsFacadeFactory}
				initialData={requests}
			>
				<InfinityTable<Request>
					columns={columns}
					heightTable={height - 30}
					entity="solicitação"
					pronoun="female"
				/>
			</InfinityQueryProvider>
		</div>
	);
}
