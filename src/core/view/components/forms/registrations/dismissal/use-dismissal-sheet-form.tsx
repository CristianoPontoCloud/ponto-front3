"use client";
import { dismissalsFacadeFactory } from "@/application/factories/registrations/dimsissals-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useDismissalSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<DismissalFormProps>();
	const { handleSubmit } = form;
	const id = form.watch("id") ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const token = useSession().data?.user.token ?? "";
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("dismissal");
	const dismissalFacade = useMemo(() => dismissalsFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		DismissalFormProps,
		DismissalDetails
	>({
		closeSheet,
		form,
		queryKey: "dismissal",
	});
	async function excludeDismissal() {
		await dismissalFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="motivo de demissão" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeDismissal() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este motivo de demissão, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludeDismissal()}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: DismissalFormProps) {
		await executeCreateOrUpdate({
			data,
			facadeFactorie: dismissalFacade,
			entity: "motivo de demissão",
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalExlcudeDismissal,
		id,
	};
}
