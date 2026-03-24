import { holidaysFacadeFactory } from "@/application/factories/registrations/holidays-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { changeStatusDispatcher } from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { holidaySchema } from "@/application/validation/forms/registrations/holiday-schema";
import type { Option } from "@/domain/components/options";
import type { Holiday, HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday";
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
import { holidayInitialFormValues } from "./holidays-initial-values";

export function useHolidaysPage() {
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";
	const [formValues, setFormValues] = useState<HolidayFormProps>(holidayInitialFormValues);
	const holidayFacade = useMemo(() => holidaysFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("holiday");
	const toastDefaults = useToastCustomDefaults();
	const form = useForm<HolidayFormProps>({
		values: formValues,
		resolver: zodResolver(holidaySchema),
		mode: "onSubmit",
	});
	const { resetModal, setModalAndOpen } = useModal();
	const { setOpen, open } = useSheet();

	async function editHoliday(holidayId: string) {
		async function getHolidayFormValues() {
			const form = await holidayFacade.findById(holidayId);
			if (!form) return;
			setFormValues(form);
		}
		await getHolidayFormValues();
		setOpen(true);
	}

	async function excludeHoliday(id: string) {
		await holidayFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		toastCustom({
			Component: <toastDefaults.Exclude entity="feriado" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}

	function closeSheet() {
		setFormValues(holidayInitialFormValues);
		setOpen(false);
	}

	const optionsConfig = (holiday: Holiday): Option[] => {
		const { id, status } = holiday;
		const currentStatus = getStatus(status);
		const changeStatusLabel =
			currentStatus.value === StatusDefaultEnum.active ? "Inativar" : "Ativar";
		return [
			{
				label: "Gerenciar",
				onClick: () => editHoliday(holiday.id),
				hasSeparator: true,
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<HolidayDetails>({
						status: holiday.status,
						facadeFactorie: holidayFacade,
						id: holiday.id,
						entity: "feriado",
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
							"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este feriado, pois as atribuições serão perdidas.",
						footer: (
							<>
								<Button
									className="bg-red-600"
									variant="destructive"
									onClick={() => excludeHoliday(id)}
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

	const columns: ColumnDef<Holiday>[] = [
		{
			accessorKey: "name",
			header: () => {
				return <div>Nome</div>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},
		{
			accessorKey: "date",
			header: () => {
				return <div>Data</div>;
			},
			cell: ({ row }) => {
				const rawDate = row.getValue<string>("date");
				const date = rawDate ? format(new Date(rawDate), "dd/MM/yyyy") : "";
				return <div>{date}</div>;
			},
		},
		generateStatusColumn<Holiday>({
			optionsParams: ({ row }) => ({
				options: optionsConfig(row.original),
			}),
		}),
	];
	useEffect(() => {
		if (open) return;
		setFormValues(holidayInitialFormValues);
		form.reset();
	}, [open, form]);
	return {
		form,
		columns,
		closeSheet,
	};
}
