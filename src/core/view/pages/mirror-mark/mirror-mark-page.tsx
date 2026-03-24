"use client";
import { mirrorMarkFacadeFactory } from "@/application/factories/mirror-mark-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { MirrorMark } from "@/domain/entities/mirror-mark/mirror-mark";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { MirrorMarkFilters } from "./mirror-mark-filters";
import { MirrorMarkFooter } from "./mirror-mark-footer";
import { useMirrorMarkPage } from "./use-mirror-mark-page";

export function MirrorMarkPage({ mirrorsMark }: { mirrorsMark: PaginationDto<MirrorMark[]> }) {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	const { columns, selectsMirrorMarks } = useMirrorMarkPage(mirrorsMark);
	return (
		<InfinityQueryProvider<MirrorMark>
			queryKey="mirror-mark"
			initialData={mirrorsMark}
			facadeFactory={mirrorMarkFacadeFactory}
		>
			<div className="flex flex-col max-h-full gap-4">
				<div className="flex justify-between items-center" ref={headerRef}>
					<h1 className="text-2xl font-semibold w-full">Espelho de ponto</h1>
					<MirrorMarkFilters />
				</div>
				<InfinityTable<MirrorMark>
					columns={columns}
					entity="espelho de ponto"
					pronoun="female"
					heightTable={height - 85}
					customNoValuesMessage={{
						title: "Nenhum espelho de ponto no período",
						message:
							"Todos os espelhos de ponto do collaborador no período serão disponibilizados aqui.",
					}}
				/>
				<MirrorMarkFooter selectsMirrorMarks={selectsMirrorMarks} />
			</div>
		</InfinityQueryProvider>
	);
}
