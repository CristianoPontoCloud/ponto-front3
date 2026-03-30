"use client";
import { positionsFacadeFactory } from "@/application/factories/registrations/positions-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import type { Position } from "@/domain/entities/positions";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import PositionSheetForm from "@/view/components/forms/registrations/position/position-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { usePositionPage } from "./use-positions-page";

interface PositionsPageParams {
	positions: PaginationDto<Position[]>;
}

export default function PositionsPage({ positions }: PositionsPageParams) {
	const { columns, form, closeSheet } = usePositionPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<div ref={headerRef}>
				<DataManager
					sheetParams={{
						title: `${form.watch("id") ? "Editar" : "Cadastrar"} cargo`,
						FormComponent: <PositionSheetForm closeSheet={() => closeSheet()} />,
						labelOpenSheet: "Cargo",
						sheetWidth: "22vw",
						sheetMinWidth: "410px",
						form,
					}}
				/>
			</div>
			<InfinityQueryProvider<Position>
				queryKey="position"
				facadeFactory={positionsFacadeFactory}
				initialData={positions}
			>
				<InfinityTable<Position> columns={columns} heightTable={height - 30} entity="cargo" />
			</InfinityQueryProvider>
		</div>
	);
}
