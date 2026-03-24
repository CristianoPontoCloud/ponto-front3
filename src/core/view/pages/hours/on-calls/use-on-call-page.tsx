import { oncallsFacadeFactory } from "@/application/factories/hours/on-calls-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { onCallSchema } from "@/application/validation/forms/hours/on-call";
import type { Option } from "@/domain/components/options";
import type { OnCall, OnCallDetails, OnCallFormProps } from "@/domain/entities/on-call";
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
import { onCallInitialFormValues } from "./on-call-initial-values";

export function useOnCallPage() {
	const [formValues, setFormValues] = useState<OnCallFormProps>(onCallInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<OnCallFormProps>({
		values: formValues,
		resolver: zodResolver(onCallSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const oncallFacade = useMemo(() => oncallsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("oncall");
	async function editOnCall(oncallId: string) {
		async function getOnCallFormValues() {
			const form = await oncallFacade.findById(oncallId);
			if (!form) return;
			setFormValues(form);
		}
		await getOnCallFormValues();
		setOpen(true);
	}
	function closeSheet() {
		setFormValues(onCallInitialFormValues);
		setOpen(false);
	}

	async function excludePosition(id: string) {
		await oncallFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="sobreaviso" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}

	const optionsConfig = (oncall: OnCall): Option[] => {
		const { id, status } = oncall;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";

		return [
			{
				label: "Gerenciar",
				onClick: () => editOnCall(oncall.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<OnCallDetails>({
						id: oncall.id,
						status: oncall.status,
						facadeFactorie: oncallFacade,
						entity: "hora extra",
						pronoun: "female",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este sobreaviso, pois as atribuições serão perdidas.",
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
	const columns: ColumnDef<OnCall>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "type",
			header: () => {
				return <div>Tipo</div>;
			},
			cell: ({ row }) => {
				return <div>{row.getValue("type")}</div>;
			},
		},
		{
			accessorKey: "collaborators",
			header: () => {
				return <div>Colaboradores</div>;
			},
			cell: ({ row }) => <div>{row.getValue("collaborators")}</div>,
		},
		generateStatusColumn<OnCall>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	const { reset } = form;
	useEffect(() => {
		if (open) return;
		setFormValues(onCallInitialFormValues);
		reset();
	}, [open, reset]);

	return {
		columns,
		form,
		closeSheet,
	};
}
