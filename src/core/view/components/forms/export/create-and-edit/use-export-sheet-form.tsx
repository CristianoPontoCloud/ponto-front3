import { exportsFacadeFactory } from "@/application/factories/exports-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { ExportLayoutFormProps } from "@/domain/entities/exports/exports";
import { Check, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toastCustom } from "../../../toaster/toast-custom";
import { useToastCustomDefaults } from "../../../toaster/toast-customs/default-toasts-custom";
import { toastError } from "../../../toaster/toast-error";
import { Button } from "../../../ui/button";
export function useExportSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<ExportLayoutFormProps>();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const id = form.watch("id") ?? "";
	const toast = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const exportFacade = useMemo(() => exportsFacadeFactory(token), [token]);
	const {
		formState: { isSubmitting, isSubmitSuccessful },
		handleSubmit,
	} = form;
	const { invalidateQueryAndRefetch, invalidateSelects } = useInvalidateQueryAndRefetch("exports");
	const companyId = useSession().data?.user.companyId ?? "";
	function updateStates() {
		invalidateQueryAndRefetch();
		closeSheet();
		form.reset();
		invalidateSelects();
	}

	async function excludeExport({ name }: { id: string; name: string }) {
		await exportFacade.delete();
		updateStates();
		toastCustom({
			Component: (
				<toast.WithIcon
					title="Layout excluído com sucesso!"
					description={name}
					icon={<Trash2 className="text-destructive w-[16px] h-[16px]" />}
				/>
			),
		});
	}
	async function openModalExlcudeExport(params: { id: string; name: string }) {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta empresa, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeExport(params)}
					>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: ExportLayoutFormProps) {
		const id = data.id;
		const classNameToasts = "text-lime-600 w-[16px] h-[16px]";
		try {
			if (id) {
				const response = await exportFacade.update({
					...data,
					id,
					companyId,
				});
				toastCustom({
					Component: (
						<toast.WithIcon
							title="Layout editado com sucesso!"
							description={response?.name ?? ""}
							icon={<Check className={classNameToasts} />}
						/>
					),
				});
				updateStates();
				return;
			}
			const response = await exportFacade.create({
				...data,
				companyId,
			});
			toastCustom({
				Component: (
					<toast.WithIcon
						title="Layout criado com sucesso!"
						description={response?.name ?? ""}
						icon={<Check className={classNameToasts} />}
					/>
				),
			});
			updateStates();
			return;
		} catch {
			toastError({ tittle: "Erro de servidor" });
		}
	}

	return {
		form,
		isSubmitting,
		handleSubmit,
		onSubmit,
		isSubmitSuccessful,
		id,
		openModalExlcudeExport,
	};
}
