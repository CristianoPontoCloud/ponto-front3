"use client";
import { holidaysFacadeFactory } from "@/application/factories/registrations/holidays-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useCreateOrUpdateDispatcher } from "@/application/usecases/save-or-update-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { HolidayDetails, HolidayFormProps } from "@/domain/entities/holiday";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export function useHolidaySheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<HolidayFormProps>();
	const { handleSubmit } = form;
	const id = form.watch("id") ?? "";
	const { setModalAndOpen, resetModal } = useModal();
	const token = useSession().data?.user.token ?? "";
	const { Exclude } = useToastCustomDefaults();
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("holiday");
	const holidayFacade = useMemo(() => holidaysFacadeFactory(token), [token]);
	const { executeCreateOrUpdate } = useCreateOrUpdateDispatcher<HolidayFormProps, HolidayDetails>({
		closeSheet,
		form,
		queryKey: "holiday",
	});
	async function excludeHoliday(id: string) {
		await holidayFacade.delete(id);
		invalidateQueryAndRefetch();
		resetModal();
		closeSheet();
		toastCustom({
			Component: <Exclude entity="feriado" />,
			action: {
				label: "Desfazer",
				onClick: () => console.log("desfazendo..."),
			},
		});
	}
	function openModalExlcudeHoliday() {
		setModalAndOpen({
			title: "Tem certeza que deseja excluir?",
			description:
				"Esta ação não pode ser desfeita. Certifique-se que não haja nenhum colaborador atribuído a este feriado, pois as atribuições serão perdidas.",
			footer: (
				<>
					<Button className="bg-red-600" variant="destructive" onClick={() => excludeHoliday(id)}>
						Excluir
					</Button>
					<Button variant="secondary" onClick={() => resetModal()}>
						Cancelar
					</Button>
				</>
			),
		});
	}
	async function onSubmit(data: HolidayFormProps) {
		await executeCreateOrUpdate({
			data,
			facadeFactorie: holidayFacade,
			entity: "feriado",
			catchFn: () => toastError({ tittle: "Erro de servidor" }),
		});
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalExlcudeHoliday,
		id,
	};
}
