"use client";
import { costcentersFacadeFactory } from "@/application/factories/registrations/costcenter-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { CostCenterDetails, CostCenterFormProps } from "@/domain/entities/center-cost";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useCostCenterSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<CostCenterFormProps>();
	const { handleSubmit } = form;
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("center-cost");
	const token = useSession().data?.user.token ?? "";
	const id = form.watch("id") ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const costcentersFacade = useMemo(() => costcentersFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		CostCenterFormProps,
		CostCenterDetails
	>({
		closeSheet,
		form,
		queryKey: "center-cost",
	});
	async function excludeCostCenter(id: string) {
		await costcentersFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="centro de custo" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeCostCenter() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este centro de custo, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button
						className="bg-red-600"
						variant="destructive"
						onClick={() => excludeCostCenter(id)}
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
	async function onSubmit(data: CostCenterFormProps) {
		await executeCreateOrUpdate({
			data,
			entity: "centro de custo",
			facadeFactorie: costcentersFacade,
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
			invalidSelects: true,
		});
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalExlcudeCostCenter,
		id,
	};
}
