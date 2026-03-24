import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { turnSchema } from "@/application/validation/forms/hours/turns/turns";
import type { Option } from "@/domain/components/options";
import {
	type Turn,
	type TurnDetails,
	type TurnFormProps,
	getTypeTurnLabel,
} from "@/domain/entities/turns/turns";
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
import { turnInitialFormValues } from "./turns-initial-values";

export function useTurnsPage() {
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const userId = session.data?.user.id;
	const turnFacade = useMemo(() => turnsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("work-shift");
	const toastDefaults = useToastCustomDefaults();
	const { parameters, load } = useSysConfigStore();

	const [formValues, setFormValues] = useState<TurnFormProps>(turnInitialFormValues(parameters));

	const form = useForm<TurnFormProps>({
		values: formValues,
		resolver: zodResolver(turnSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();

	async function editTurn(turnId: string) {
		async function getTurnFormValues() {
			const response = await turnFacade.findById(turnId);
			if (!response) return;
			const { policy, ...turn } = response;
			const formProps: TurnFormProps = {
				...turnInitialFormValues(parameters),
				...turn,
				...policy,
				id: turn.id,
			};
			console.log({ formProps });
			setFormValues(formProps);
		}
		await getTurnFormValues();
		setOpen(true);
	}

	async function excludeTurn(turnId: string) {
		await turnFacade.delete(turnId);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="turno" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(turnInitialFormValues(parameters));
		setOpen(false);
	}

	const optionsConfig = (turn: TurnDetails): Option[] => {
		const { id, status } = turn;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editTurn(turn.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<Turn>({
						id: turn.id,
						status: turn.status,
						facadeFactorie: turnFacade,
						entity: "empresa",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este turno, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeTurn(id)}
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

	const columns: ColumnDef<TurnDetails>[] = [
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
				const type = getTypeTurnLabel(row.getValue("type"));
				return <div>{type}</div>;
			},
		},
		{
			accessorKey: "period",
			header: () => {
				return <div>Períodos</div>;
			},
			cell: ({ row }) => <div>{row.getValue("period")}</div>,
		},
		{
			accessorKey: "collaborators",
			header: () => {
				return <div>Colaboradores</div>;
			},
			cell: ({ row }) => <div>{row.getValue("collaborators")}</div>,
		},
		generateStatusColumn<TurnDetails>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(turnInitialFormValues(parameters));
		form.reset();
	}, [form, open, parameters]);

	useEffect(() => {
		setFormValues(turnInitialFormValues(parameters));
	}, [parameters]);

	useEffect(() => {
		if (userId) {
			load(userId);
		}
	}, [load, userId]);

	return {
		formValues,
		columns,
		form,
		closeSheet,
	};
}
