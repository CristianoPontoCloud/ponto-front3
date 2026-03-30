import { extraHoursFacadeFactory } from "@/application/factories/hours/extra-hours-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { extraHourSchema } from "@/application/validation/forms/hours/extra-hour";
import type { Option } from "@/domain/components/options";
import type {
	ExtraHour,
	ExtraHourDetails,
	ExtraHourFormProps
} from "@/domain/entities/extra-hour/extra-hour";
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
import { extraHourInitialFormValues } from "./extra-hour-initial-values";

export function useExtraHourPage() {
	const [formValues, setFormValues] = useState<ExtraHourFormProps>(extraHourInitialFormValues);
	const toastDefaults = useToastCustomDefaults();

	const form = useForm<ExtraHourFormProps>({
		values: formValues,
		resolver: zodResolver(extraHourSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const extrahourFacade = useMemo(() => extraHoursFacadeFactory(token), [token]);
	// const rulesFacade = useMemo(() => extraHoursRulesFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("extra-hour");

	async function editExtraHour(extrahourId: string) {
		async function getExtraHourFormValues() {
			const extraHour = await extrahourFacade.findById(extrahourId);
			if (!extraHour) return;
			setFormValues({ ...extraHour, companyId });
		}
		await getExtraHourFormValues();
		setOpen(true);
	}

	function excludeExtrahour(extrahourId: string) {
		console.log(`${extrahourId}`);
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="hora extra" pronoun="female" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(extraHourInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (extrahour: ExtraHour): Option[] => {
		const { id, status } = extrahour;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Editar",
				onClick: () => editExtraHour(extrahour.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<ExtraHourDetails>({
						id: extrahour.id,
						status: extrahour.status,
						facadeFactorie: extrahourFacade,
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a está hora extra, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeExtrahour(id)}
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

	const columns: ColumnDef<ExtraHour>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "rules",
			header: () => {
				return <div>Regras</div>;
			},
			cell: ({ row }) => <div>{row.getValue("rules")}</div>,
		},
		{
			accessorKey: "collaborators",
			header: () => {
				return <div>Colaboradores</div>;
			},
			cell: ({ row }) => <div>{row.getValue("collaborators") ?? ""}</div>,
		},
		generateStatusColumn<ExtraHour>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	const { reset } = form;
	useEffect(() => {
		if (open) return;
		setFormValues(extraHourInitialFormValues);
		reset();
	}, [open, reset]);

	return {
		closeSheet,
		formValues,
		form,
		columns,
	};
}
