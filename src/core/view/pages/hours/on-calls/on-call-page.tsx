"use client";
import { oncallsFacadeFactory } from "@/application/factories/hours/on-calls-facade-factory";
import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import { InfinityQueryProvider } from "@/application/providers/infinity-pagination/infinity-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import type { OnCall } from "@/domain/entities/on-call";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import DataManager from "@/view/components/data-manager/data-manager";
import { OnCallSheetForm } from "@/view/components/forms/hours/oncall/on-call-sheet-form";
import { InfinityTable } from "@/view/components/inifity-table/infinity-table";
import { useRef } from "react";
import { useOnCallPage } from "./use-on-call-page";
interface OnCallPageParams {
	oncalls: PaginationDto<OnCall[]>;
}
export default function OnCallPage({ oncalls }: OnCallPageParams) {
	const { columns, form } = useOnCallPage();
	const headerRef = useRef<HTMLDivElement | null>(null);
	const height = useBottomOffset(headerRef);
	const { setOpen } = useSheet();

	return (
		<InfinityQueryProvider<OnCall>
			queryKey="oncall"
			initialData={oncalls}
			facadeFactory={oncallsFacadeFactory}
		>
			<div className="w-full h-full flex flex-col gap-4">
				<div ref={headerRef}>
					<DataManager
						sheetParams={{
							title: `${form.watch("id") ? "Editar" : "Cadastrar"} sobreaviso`,
							FormComponent: <OnCallSheetForm closeSheet={() => setOpen(false)} />,
							labelOpenSheet: "Sobreaviso",
							sheetWidth: "410px",
							sheetMinWidth: "410px",
							form,
						}}
					/>
				</div>
				<InfinityTable<OnCall> columns={columns} heightTable={height - 30} entity="sobreaviso" />
			</div>
		</InfinityQueryProvider>
	);
}
