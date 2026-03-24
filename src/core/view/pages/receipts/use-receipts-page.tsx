import { receiptsFacadeFactory } from "@/application/factories/receipts-factory";
import { type Receipts, ReceiptsGenerateModeEnum } from "@/domain/entities/receipts/receipts";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { InifinityTableSelectBody } from "@/view/components/inifity-table/components/inifinity-table-select-body";
import { InifinityTableSelectHeader } from "@/view/components/inifity-table/components/inifinity-table-select-header";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export function useReceiptsPage(receipts: PaginationDto<Receipts[]>) {
	const [selectsReceipts, setSelectsReceipts] = useState<string[]>([]);
	const receiptsIdList = receipts.data?.map(({ id }) => id) ?? [];
	const user = useSession().data?.user
	const token = user?.token ?? ""
	const companyId = user?.companyId ?? ""
	const receiptFacade = useMemo(() => receiptsFacadeFactory(token), [token])
	const columns: ColumnDef<Receipts>[] = [
		{
			accessorKey: "hour",
			header: () => {
				return (
					<div className="flex gap-4 justify-start items-center">
						<InifinityTableSelectHeader
							list={receiptsIdList}
							checkedList={selectsReceipts}
							setCheckedList={setSelectsReceipts}
						/>
						Hora
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="flex gap-4 justify-start items-center">
					<InifinityTableSelectBody
						id={row.original.id}
						checkedList={selectsReceipts}
						setCheckedList={setSelectsReceipts}
					/>
					{new Intl.DateTimeFormat("pt-BR", {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: false,
					}).format(row.original.date)}
				</div>
			),
		},
		{
			accessorKey: "date",
			header: () => <div>Data</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{format(row.original.date, "dd/MM/yyyy")}</div>;
			},
		},
		{
			accessorKey: "weekday",
			header: () => <div>Dia da semana</div>,
			size: 1,
			cell: ({ row }) => {
				return (
					<div>
						{new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(row.original.date)}
					</div>
				);
			},
		},
		{
			accessorKey: "typeMark",
			header: () => <div>Tipo de marcação</div>,
			size: 1,
			cell: ({ row }) => {
				return <div>{row.original.typeMark}</div>;
			},
		},
		{
			id: "download",
			size: 1,
			cell: () => {
				return (
					<div className="flex justify-end">
						<Button
							variant="ghost"
							type="button"
							size="icon"
							onClick={() => {
								toastCustom({
									Component: <DownloadFileToast fileName="Comprovante" loadFile={() => { }} />,
								});
							}}
						>
							<Download className="w-[16px] h-[16px]" />
						</Button>
					</div>
				);
			},
		},
	];
	async function openWebSocket() {
		try {
			await receiptFacade.generate({ companyId, mode: ReceiptsGenerateModeEnum.ECONOMICO, from: "2026-02-01", to: "2026-03-01" })
		} catch {
			toastError({ tittle: "Erro de servidor" })
		}
	}
	useEffect(() => {
		openWebSocket()
	}, [])
	return {
		columns,
		selectsReceipts,
	};
}
