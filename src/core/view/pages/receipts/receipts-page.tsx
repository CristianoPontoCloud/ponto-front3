"use client";
import { receiptsFacadeFactory } from "@/application/factories/receipts-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Receipts } from "@/domain/entities/receipts/receipts";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { ReceiptFooter } from "./receipt-footer";
import { ReceiptsFilters } from "./receipts-filters";
import { useReceiptsPage } from "./use-receipts-page";

export function ReceiptsPage({ receipts }: { receipts: PaginationDto<Receipts[]> }) {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	const { columns, selectsReceipts } = useReceiptsPage(receipts);
	return (
		<InfinityQueryProvider<Receipts>
			queryKey="recepts"
			initialData={receipts}
			facadeFactory={receiptsFacadeFactory}
		>
			<div className="flex flex-col max-h-full gap-4">
				<div className="flex justify-between items-center" ref={headerRef}>
					<h1 className="text-2xl font-semibold">Comprovantes</h1>
					<ReceiptsFilters />
				</div>
				<InfinityTable<Receipts>
					columns={columns}
					entity="comprovante"
					pronoun="female"
					heightTable={height - 85}
					customNoValuesMessage={{
						title: "Nenhum comprovante no período",
						message:
							"Todos os comprovantes do collaborador no período serão disponibilizados aqui.",
					}}
				/>
				<ReceiptFooter selectsReceipts={selectsReceipts} />
			</div>
		</InfinityQueryProvider>
	);
}
