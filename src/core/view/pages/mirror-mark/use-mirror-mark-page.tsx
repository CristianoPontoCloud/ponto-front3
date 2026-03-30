import type { MirrorMark } from "@/domain/entities/mirror-mark/mirror-mark";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { InifinityTableSelectBody } from "@/view/components/inifity-table/components/inifinity-table-select-body";
import { InifinityTableSelectHeader } from "@/view/components/inifity-table/components/inifinity-table-select-header";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { useState } from "react";

export function useMirrorMarkPage(mirrorMarks: PaginationDto<MirrorMark[]>) {
	const [selectsIdsMirrorMarks, setSelectsIdsMirrorMarks] = useState<string[]>([]);
	const mirrorMarkIdList = mirrorMarks.data?.map(({ id }) => id) ?? [];
	const columns: ColumnDef<MirrorMark>[] = [
		{
			accessorKey: "periodTo",
			header: () => {
				return (
					<div className="flex gap-4 justify-start items-center">
						<InifinityTableSelectHeader
							list={mirrorMarkIdList}
							checkedList={selectsIdsMirrorMarks}
							setCheckedList={setSelectsIdsMirrorMarks}
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
							checkedList={selectsIdsMirrorMarks}
							setCheckedList={setSelectsIdsMirrorMarks}
						/>
						{formatted}
						{
							row.original.isCurrent && <Badge className="bg-primary/10 text-primary text-xs h-[20px]  py-1 px-2">
								Atual
							</Badge>
						}
					</div>
				);
			},
		},
		{
			accessorKey: "periodFrom",
			header: () => <div>Período</div>,
			size: 1,
			cell: ({ row }) => {
				return <div >{`${format(row.original.periodFrom, "dd/MM/yyyy")} à ${format(row.original.periodTo, "dd/MM/yyyy")}`}</div>;
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
	// async function openWebSocket() {
	// 	try {
	// 		await mirrorMarkFacade.generate({ companyId, collaboratorId, scope: ScopeEnum.MY, from: "2026-02-01", to: "2026-03-01", tz: "America/Sao_Paulo" })
	// 	} catch {
	// 		toastError({ tittle: "Erro de servidor" })
	// 	}
	// }
	// useEffect(() => {
	// 	openWebSocket()
	// }, [])

	return {
		columns,
		selectsIdsMirrorMarks,
	};
}
