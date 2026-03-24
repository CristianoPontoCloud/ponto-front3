import { equipmentsFacadeFactory } from "@/application/factories/registrations/equipments-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { equimentSchema } from "@/application/validation/forms/registrations/equiment-schema";
import type { Option } from "@/domain/components/options";
import type {
	Equipment,
	EquipmentDetails,
	EquipmentFormProps,
	EquipmentMark,
	EquipmentModel,
} from "@/domain/entities/equipment";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { equipmentInitialFormValues } from "./equipments-initial-values";

export function useEquipmentsPage() {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<EquipmentFormProps>(equipmentInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<EquipmentFormProps>({
		values: formValues,
		resolver: zodResolver(equimentSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const equipmentFacade = useMemo(() => equipmentsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("equipment");

	async function editEquipment(equipmentId: string) {
		async function getEquipmentFormValues() {
			const form = await equipmentFacade.findById(equipmentId);
			if (!form) return;
			setFormValues(form);
		}
		await getEquipmentFormValues();
		setOpen(true);
	}

	async function excludeEquipment(id: string) {
		await equipmentFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="equipment" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(equipmentInitialFormValues);
		setOpen(false);
	}
	const optionsConfig = (equipment: Equipment): Option[] => {
		const { id, status, mark, model } = equipment;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editEquipment(equipment.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<EquipmentDetails>({
						status: equipment.status,
						facadeFactorie: equipmentFacade,
						id: equipment.id,
						entity: "equipamento",
						customParams: {
							markId: mark.id,
							modelId: model.id
						},
						finallyFn: async () => await invalidateQueryAndRefetch(),
						companyId,
					});
				},
				hasSeparator: true,
			},
			{
				label: "Excluir",
				onClick: () =>
					setModalAndOpen({
						title: "Tem certeza que deseja excluir?",
						description:
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este equipamento, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeEquipment(id)}
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
	const columns: ColumnDef<Equipment>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "mark",
			header: "Marca",
			cell: ({ row }) => <div>{row.getValue<EquipmentMark>("mark").name}</div>,
		},
		{
			accessorKey: "model",
			header: "Modelo",
			cell: ({ row }) => <div>{row.getValue<EquipmentModel>("model").name}</div>,
		},
		generateStatusColumn<Equipment>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(equipmentInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		form,
		columns,
		closeSheet,
	};
}
