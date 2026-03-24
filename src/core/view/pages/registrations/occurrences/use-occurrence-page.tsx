import { occurrencesFacadeFactory } from "@/application/factories/registrations/occurrences-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { occurrenceSchema } from "@/application/validation/forms/registrations/occurrence-schema";
import type { Option } from "@/domain/components/options";
import type {
	Occurrence,
	OccurrenceDetails,
	OccurrenceFormProps,
} from "@/domain/entities/occurrence";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { occurrenceInitialFormValues } from "./occurrences-initial-values";

export function useOccurrencesPage() {
	const toastDefaults = useToastCustomDefaults();
	const session = useSession();
	const [id, setId] = useQueryState("id");
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<OccurrenceFormProps>(occurrenceInitialFormValues);
	const occurrenceFacade = useMemo(() => occurrencesFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("occurrence");
	const form = useForm<OccurrenceFormProps>({
		values: formValues,
		resolver: zodResolver(occurrenceSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();

	const editOccurrence = useCallback(
		async (occurrenceId: string) => {
			async function getOccurrenceFormValues() {
				const form = await occurrenceFacade.findById(occurrenceId);
				if (!form) return;
				setFormValues(form);
			}
			await getOccurrenceFormValues();
			setOpen(true);
		},
		[setOpen, occurrenceFacade],
	);
	// async function editOccurrence(occurrenceId: string) {
	// 	async function getOccurrenceFormValues() {
	// 		const form = await occurrenceFacade.findById(occurrenceId);
	// 		if (!form) return;
	// 		setFormValues(form);
	// 	}
	// 	await getOccurrenceFormValues();
	// 	setOpen(true);
	// }

	async function excludeOccurrence(occurrenceId: string) {
		await occurrenceFacade.delete(occurrenceId);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="ocorrência" pronoun="female" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(occurrenceInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (occurrence: Occurrence): Option[] => {
		const { id, status } = occurrence;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Editar",
				onClick: () => editOccurrence(occurrence.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<OccurrenceDetails>({
						status: occurrence.status,
						facadeFactorie: occurrenceFacade,
						id: occurrence.id,
						entity: "ocorrência",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a esta ocorrência, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeOccurrence(id)}
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

	const columns: ColumnDef<Occurrence>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		generateStatusColumn<Occurrence>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (!id) return;
		editOccurrence(id);
		setId(null);
	}, [id, editOccurrence, setId]);

	useEffect(() => {
		if (open) return;
		setFormValues(occurrenceInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		form,
		columns,
		closeSheet,
	};
}
