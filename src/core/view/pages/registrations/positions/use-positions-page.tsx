import { positionsFacadeFactory } from "@/application/factories/registrations/positions-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { positionSchema } from "@/application/validation/forms/registrations/position-schema";
import type { Option } from "@/domain/components/options";
import type { Position, PositionDetails, PositionFormProps } from "@/domain/entities/positions";
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
import { positionInitialFormValues } from "./positions-initial-values";

export function usePositionPage() {
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const companyId = user?.companyId ?? "";
	const [formValues, setFormValues] = useState<PositionFormProps>(positionInitialFormValues);
	const positionFacade = useMemo(() => positionsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("position");
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<PositionFormProps>({
		values: formValues,
		resolver: zodResolver(positionSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();

	async function editPosition(positionId: string) {
		async function getPositionFormValues() {
			const form = await positionFacade.findById(positionId);
			if (!form) return;
			setFormValues(form);
		}
		await getPositionFormValues();
		setOpen(true);
	}
	async function excludePosition(id: string) {
		await positionFacade.delete(id);
		resetModal();
		invalidateQueryAndRefetch();
		toastCustom({
			Component: <toastDefaults.Exclude entity="cargo" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(positionInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (position: Position): Option[] => {
		const { id, status } = position;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editPosition(position.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<PositionDetails>({
						status: position.status,
						facadeFactorie: positionFacade,
						id: position.id,
						entity: "cargo",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este cargo, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludePosition(id)}
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

	const columns: ColumnDef<Position>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "collaborators",
			header: () => {
				return <div>Colaboradores</div>;
			},
			cell: ({ row }) => <div>{row.getValue("collaborators") ?? 0}</div>,
		},
		generateStatusColumn<Position>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	useEffect(() => {
		if (open) return;
		setFormValues(positionInitialFormValues);
		form.reset();
	}, [open, form]);

	useEffect(() => {
		form.setValue("companyId", companyId);
	}, [companyId, form]);

	return {
		form,
		columns,
		closeSheet,
	};
}
