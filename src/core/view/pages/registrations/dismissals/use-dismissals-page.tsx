import { dismissalsFacadeFactory } from "@/application/factories/registrations/dimsissals-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { dismissalSchema } from "@/application/validation/forms/registrations/dismissal-schema";
import type { Option } from "@/domain/components/options";
import type { Dismissal, DismissalDetails, DismissalFormProps } from "@/domain/entities/dismissal";
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
import { dismissalInitialFormValues } from "./dismissals-initial-values";

export function useDismissalsPage() {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<DismissalFormProps>(dismissalInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<DismissalFormProps>({
		values: { ...formValues, companyId },
		resolver: zodResolver(dismissalSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const dismissalFacade = useMemo(() => dismissalsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("dismissal");
	async function editDismissal(dismissalId: string) {
		async function getDismissalFormValues() {
			const form = await dismissalFacade.findById(dismissalId);
			if (!form) return;
			setFormValues(form);
		}
		await getDismissalFormValues();
		setOpen(true);
	}

	async function excludeDismissal(id: string) {
		await dismissalFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="Motivo de demissão" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(dismissalInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (dismissal: Dismissal): Option[] => {
		const { id, status } = dismissal;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Editar",
				onClick: () => editDismissal(dismissal.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<DismissalDetails>({
						status: dismissal.status,
						facadeFactorie: dismissalFacade,
						id: dismissal.id,
						entity: "motivo de demissão",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta demissão, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeDismissal(id)}
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

	const columns: ColumnDef<Dismissal>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		generateStatusColumn<Dismissal>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(dismissalInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		formValues,
		columns,
		form,
		closeSheet,
	};
}
