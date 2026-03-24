import { exportsFacadeFactory } from "@/application/factories/exports-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetOverSheetContentController } from "@/application/providers/sheet-over-sheet-content/sheet-over-sheet-component-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { exportLayoutSchema } from "@/application/validation/forms/exports/export-schema";
import type { Option } from "@/domain/components/options";
import type { ExportLayout, ExportLayoutFormProps } from "@/domain/entities/exports/exports";
import { ExportDownloadHeaderSheetForm } from "@/view/components/forms/export/download/export-download-header-sheet-form";
import { ExportDownloadSheetForm } from "@/view/components/forms/export/download/export-download-sheet-form";
import { Options } from "@/view/components/options/options";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Download, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { exportLayoutInitialFormValues } from "./export-initial-values";

export function useExportsPage() {
	const [formExportLayoutValues, setFormExportLayoutValues] = useState<ExportLayoutFormProps>(
		exportLayoutInitialFormValues,
	);
	const [isDownloadForm, setIsDownloadForm] = useState<boolean>(false);
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const exportFacade = useMemo(() => exportsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch, invalidateSelects } = useInvalidateQueryAndRefetch("exports");
	const toast = useToastCustomDefaults();
	const { setContentAndOpen, reset } = useContextSheetOverSheetContentController();
	const formExportLayout = useForm<ExportLayoutFormProps>({
		values: formExportLayoutValues,
		resolver: zodResolver(exportLayoutSchema),
		mode: "onSubmit",
	});

	async function editExport(exportId: string) {
		async function getExportFormValues() {
			const formExportLayout = await exportFacade.findById(exportId);
			if (!formExportLayout) return;
			setFormExportLayoutValues({ ...formExportLayout });
		}
		await getExportFormValues();
		setOpen(true);
	}
	function updateStates() {
		resetModal();
		invalidateQueryAndRefetch();
		closeSheet();
		setFormExportLayoutValues(exportLayoutInitialFormValues);
		formExportLayout.reset();
		invalidateSelects();
	}

	async function excludeExport({ name }: { id: string; name: string }) {
		await exportFacade.delete();
		toastCustom({
			Component: (
				<toast.WithIcon
					title="Layout excluído com sucesso!"
					description={name}
					icon={<Trash2 className="text-destructive w-[16px] h-[16px]" />}
				/>
			),
		});
		updateStates();
	}
	function closeSheet() {
		setFormExportLayoutValues(exportLayoutInitialFormValues);
		setOpen(false);
		reset();
	}
	const optionsConfig = (exportData: ExportLayout): Option[] => {
		const { id, name } = exportData;
		return [
			{
				label: "Gerenciar",
				onClick: () => editExport(exportData.id),
				hasSeparator: true,
			},
			{
				label: "Excluir layout",
				onClick: () =>
					setModalAndOpen({
						title: "Tem certeza que deseja excluir?",
						description:
							"Essa ação é irreversível e não poderá ser desfeita. Tem certeza que deseja continuar?",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeExport({ id, name })}
								>
									Excluir
								</Button>
								<Button variant="secondary" onClick={() => resetModal()}>
									Cancelar
								</Button>
							</>
						),
					}),

				className: "text-red-500 focus:bg-red-500 focus:text-background !important",
			},
		];
	};

	const columns: ColumnDef<ExportLayout>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
		},
		{
			accessorKey: "lastModify",
			header: () => <div>Ultima modificação</div>,
			cell: ({ row }) => {
				const { date, time, user } = row.original.lastModify;
				const modify = `${format(date, "dd/MM/yyyy")} às ${time} por ${user}`;
				return <div className="font-medium">{modify}</div>;
			},
		},

		{
			id: "options",
			size: 1,
			cell: ({ row }) => {
				return (
					<div className={"flex gap-6"}>
						<Button
							variant="ghost"
							type="button"
							size="icon"
							onClick={() => {
								setContentAndOpen({
									sheetMinWidth: "410px",
									Header: <ExportDownloadHeaderSheetForm name={"teste"} />,
									Body: <ExportDownloadSheetForm closeSheet={closeSheet} />,
								});
							}}
						>
							<Download className="w-[12px] h-[12px]" />
						</Button>
						<Options options={optionsConfig(row.original)} label={"Ações"} />
					</div>
				);
			},
		},
	];

	useEffect(() => {
		if (open) return;
		setIsDownloadForm(false);
		setFormExportLayoutValues(exportLayoutInitialFormValues);
		formExportLayout.reset();
	}, [open, formExportLayout]);

	return {
		closeSheet,
		columns,
		isDownloadForm,
		formExportLayout,
	};
}
