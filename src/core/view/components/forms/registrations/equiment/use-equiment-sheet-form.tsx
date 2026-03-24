"use client";
import { equipmentsFacadeFactory } from "@/application/factories/registrations/equipments-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { EquipmentDetails, EquipmentFormProps } from "@/domain/entities/equipment";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export function useEquimentSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<EquipmentFormProps>();
	const { handleSubmit } = form;
	const { Exclude } = useToastCustomDefaults();
	const { setModalAndOpen, resetModal } = useModal();
	const [isFirstExecute, setIsFirstExecute] = useState<boolean>(true)
	const id = form.watch("id") ?? "";
	const markId = form.watch("markId") ?? "";
	const token = useSession().data?.user.token ?? "";
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("equipment");
	const equipmentFacade = useMemo(() => equipmentsFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<
		EquipmentFormProps,
		EquipmentDetails
	>({
		closeSheet,
		form,
		queryKey: "equipment",
	});

	async function excludeEquipment() {
		await equipmentFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="equipamento" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeEquipment() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este equipamento, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludeEquipment()}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: EquipmentFormProps) {
		await executeCreateOrUpdate({
			data,
			facadeFactorie: equipmentFacade,
			entity: "equipamento",
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}
	const { setValue } = form;
	useEffect(() => {
		if (isFirstExecute && id) {
			return setIsFirstExecute(false)
		}
		setValue("modelId", "");
	}, [markId, setValue]);

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalExlcudeEquipment,
		id,
		markId,
	};
}
