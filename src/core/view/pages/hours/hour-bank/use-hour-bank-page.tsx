import { hourBanksFacadeFactory } from "@/application/factories/hours/hour-banks-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { hourBankSchema } from "@/application/validation/forms/hours/hour-bank";
import type { Option } from "@/domain/components/options";
import type { HourBank, HourBankDetails, HourBankFormProps } from "@/domain/entities/hour-bank";
import { StatusDefaultEnum, getStatus } from "@/domain/usecases/status-default";
import { generateStatusColumn } from "@/view/components/inifity-table/generate-status-column";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { hourBankInitialFormValues } from "./hour-bank-initial-values";

export function useHourBankPage() {
	const [formValues, setFormValues] = useState<HourBankFormProps>(hourBankInitialFormValues);
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<HourBankFormProps>({
		values: formValues,
		resolver: zodResolver(hourBankSchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const hourbankFacade = useMemo(() => hourBanksFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("hour-bank");

	async function editHourbank(hourbankId: string) {
		async function getHourbankFormValues() {
			const form = await hourBanksFacadeFactory(token).findById(hourbankId);
			if (!form) return;
			setFormValues(form);
		}
		await getHourbankFormValues();
		setOpen(true);
	}

	async function excludeHourbank(hourbankId: string) {
		await hourbankFacade.delete(hourbankId);
		resetModal();
		invalidateQueryAndRefetch();
		toastCustom({
			Component: <toastDefaults.Exclude entity="banco de horas" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function closeSheet() {
		setFormValues(hourBankInitialFormValues);
		setOpen(false);
	}
	const optionsConfig = (hourbank: HourBank): Option[] => {
		const { id, status } = hourbank;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editHourbank(hourbank.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<HourBankDetails>({
						id: hourbank.id,
						status: hourbank.status,
						facadeFactorie: hourbankFacade,
						entity: "banco de horas",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este banco de horas, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeHourbank(id)}
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

	const columns: ColumnDef<HourBank>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "period",
			header: () => {
				return <div>Períodos</div>;
			},
			cell: ({ row }) => {
				const data = row.original;
				const startDate = format(new Date(data.startDate), "dd/MM/yyyy");
				const endDate = format(new Date(data.endDate), "dd/MM/yyyy");
				return <div>{`${startDate} à ${endDate}`}</div>;
			},
		},
		{
			accessorKey: "collaborators",
			header: () => {
				return <div>Colaboradores</div>;
			},
			cell: ({ row }) => <div>{row.getValue("collaborators")}</div>,
		},
		generateStatusColumn<HourBank>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];

	useEffect(() => {
		if (open) return;
		setFormValues(hourBankInitialFormValues);
		form.reset();
	}, [open, form]);

	return {
		columns,
		form,
		closeSheet,
	};
}
