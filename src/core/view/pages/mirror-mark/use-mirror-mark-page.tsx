import { mirrorMarkFacadeFactory } from "@/application/factories/mirror-mark-factory";
import type { MirrorMark } from "@/domain/entities/mirror-mark/mirror-mark";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { ViewTypeEnum } from "@/domain/view-type";
import { InifinityTableSelectBody } from "@/view/components/inifity-table/components/inifinity-table-select-body";
import { InifinityTableSelectHeader } from "@/view/components/inifity-table/components/inifinity-table-select-header";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export function useMirrorMarkPage(mirrorMarks: PaginationDto<MirrorMark[]>) {
	const [selectsMirrorMarks, setSelectsMirrorMarks] = useState<string[]>([]);
	const mirrorMarkIdList = mirrorMarks.data?.map(({ id }) => id) ?? [];
	const user = useSession().data?.user
	const token = user?.token ?? ""
	const companyId = user?.companyId ?? ""
	const collaboratorId = user?.collaboratorId ?? ""
	const mirrorMarkFacade = useMemo(() => mirrorMarkFacadeFactory(token), [token])
	const columns: ColumnDef<MirrorMark>[] = [
		{
			accessorKey: "periodTo",
			header: () => {
				return (
					<div className="flex gap-4 justify-start items-center">
						<InifinityTableSelectHeader
							list={mirrorMarkIdList}
							checkedList={selectsMirrorMarks}
							setCheckedList={setSelectsMirrorMarks}
						/>
						Competência
					</div>
				);
			},
			cell: ({ row }) => {
				const formatter = new Intl.DateTimeFormat("pt-BR", {
					month: "long",
					year: "numeric",
				});

				const date = new Date(row.original.periodTo);
				const formatted = formatter.format(date).replace(" de ", "/");

				return (
					<div className="flex gap-4 justify-start items-center">
						<InifinityTableSelectBody
							id={row.original.id}
							checkedList={selectsMirrorMarks}
							setCheckedList={setSelectsMirrorMarks}
						/>
						{formatted}
					</div>
				);
			},
		},
		{
			accessorKey: "periodFrom",
			header: () => <div>Período</div>,
			size: 1,
			cell: ({ row }) => {
				const formatter = new Intl.DateTimeFormat("pt-BR", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				});
				const dateTo = formatter.format(row.original.periodTo);
				const dateFrom = formatter.format(row.original.periodFrom);
				return <div>{`${dateFrom} à ${dateTo}`}</div>;
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
									Component: <DownloadFileToast fileName="Espelho de ponto" loadFile={() => { }} />,
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
			await mirrorMarkFacade.generate({ companyId, collaboratorId, scope: ViewTypeEnum.MY, from: "2026-02-01", to: "2026-03-01", tz: "America/Sao_Paulo" })
		} catch {
			toastError({ tittle: "Erro de servidor" })
		}
	}
	useEffect(() => {
		openWebSocket()
	}, [])

	return {
		columns,
		selectsMirrorMarks,
	};
}
